import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Easteregg.scss';

const W = 820, H = 520;
const PX = 90;
const PSPD = 5;

interface Bullet   { x: number; y: number; vx: number; vy: number; enemy: boolean }
interface Enemy    { x: number; y: number; vx: number; hp: number; maxHp: number; type: 'fighter'|'interceptor'|'bomber'; phase: number; shootCd: number; id: number }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number }
interface Powerup  { x: number; y: number; vy: number; type: 'food'|'shield' }
interface Star     { x: number; y: number; spd: number; r: number }

// ── Pure drawing functions ───────────────────────────────────────────────────

function drawXWing(ctx: CanvasRenderingContext2D, cx: number, cy: number, frame: number, shielded: boolean) {
    ctx.save();
    ctx.translate(cx, cy);

    // Shield bubble
    if (shielded) {
        const a = 0.55 + Math.sin(frame * 0.08) * 0.25;
        ctx.strokeStyle = `rgba(80,160,255,${a})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#4af';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.ellipse(0, 0, 58, 40, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // Engine glow
    const eg = 0.55 + Math.sin(frame * 0.13) * 0.3;
    ctx.shadowColor = `rgba(80,120,255,${eg})`;
    ctx.shadowBlur = 18;
    ctx.fillStyle = `rgba(110,155,255,${0.7 + eg * 0.3})`;
    ctx.beginPath(); ctx.ellipse(-46, -7, 9, 4.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-46, 7, 9, 4.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Wings (4)
    ctx.fillStyle = '#9aafc0';
    const wings: [number, number, number, number, number, number, number, number][] = [
        [14, -3, 40, -32, 44, -29, 18, -1],
        [14,  3, 40,  32, 44,  29, 18,  1],
        [-4, -3,-34, -32,-30, -34,  0, -1],
        [-4,  3,-34,  32,-30,  34,  0,  1],
    ];
    wings.forEach(([ax,ay,bx,by,cx2,cy2,dx,dy]) => {
        ctx.beginPath();
        ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.lineTo(cx2,cy2); ctx.lineTo(dx,dy);
        ctx.closePath(); ctx.fill();
    });

    // Red stripes on wings
    ctx.fillStyle = '#c0392b';
    [[24,-10,28,-18,32,-16,28,-8],[24,10,28,18,32,16,28,8],[-16,-8,-20,-17,-24,-15,-20,-7],[-16,8,-20,17,-24,15,-20,7]].forEach(([ax,ay,bx,by,cx2,cy2,dx,dy]) => {
        ctx.beginPath();
        ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.lineTo(cx2,cy2); ctx.lineTo(dx,dy);
        ctx.closePath(); ctx.fill();
    });

    // Fuselage
    ctx.fillStyle = '#d2dce8';
    ctx.beginPath();
    ctx.moveTo(48, 0); ctx.lineTo(42, -7); ctx.lineTo(-44, -9); ctx.lineTo(-48, -4);
    ctx.lineTo(-48, 4); ctx.lineTo(-44, 9); ctx.lineTo(42, 7);
    ctx.closePath(); ctx.fill();

    // Top shadow strip
    ctx.fillStyle = '#b2bcc8';
    ctx.beginPath();
    ctx.moveTo(48, 0); ctx.lineTo(42, -7); ctx.lineTo(-44, -9); ctx.lineTo(-48, -4);
    ctx.lineTo(-44, -2); ctx.lineTo(42, -1); ctx.closePath(); ctx.fill();

    // Cockpit tint
    ctx.fillStyle = '#19304e';
    ctx.beginPath(); ctx.ellipse(12, -10, 14, 8, -0.15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(130,210,255,0.72)';
    ctx.beginPath(); ctx.ellipse(12, -12, 10, 5, -0.15, 0, Math.PI); ctx.fill();

    // R2-D2 unit
    ctx.fillStyle = '#8899aa'; ctx.beginPath(); ctx.arc(-8, -8, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#5599dd'; ctx.beginPath(); ctx.arc(-8, -8, 3, 0, Math.PI * 2); ctx.fill();

    // Laser cannons
    ctx.fillStyle = '#d4a843';
    [[44,-29],[44,29],[-30,-34],[-30,34]].forEach(([lx,ly]) => {
        ctx.fillRect(lx, ly - 1.5, 8, 3);
    });

    ctx.restore();
}

function drawTIE(ctx: CanvasRenderingContext2D, cx: number, cy: number, type: string) {
    ctx.save();
    ctx.translate(cx, cy);

    const isInt    = type === 'interceptor';
    const isBomber = type === 'bomber';
    const accent   = isInt ? '#2ecc71' : isBomber ? '#9b59b6' : '#e74c3c';
    const pW = isBomber ? 24 : 20;
    const pH = isBomber ? 32 : isInt ? 28 : 25;
    const pX = isBomber ? 40 : 35;

    [-1, 1].forEach(side => {
        const px = side * pX;
        ctx.fillStyle = '#141e2e';

        if (isInt) {
            // Arrow/angled panels
            ctx.beginPath();
            ctx.moveTo(px, -pH);
            ctx.lineTo(px + side * pW, -pH / 3);
            ctx.lineTo(px + side * pW,  pH / 3);
            ctx.lineTo(px,  pH);
            ctx.lineTo(px - side * 10,  pH / 3);
            ctx.lineTo(px - side * 10, -pH / 3);
            ctx.closePath();
        } else {
            // Hex panels
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
                const rx = px + Math.cos(a) * pW;
                const ry = Math.sin(a) * pH;
                i === 0 ? ctx.moveTo(rx, ry) : ctx.lineTo(rx, ry);
            }
            ctx.closePath();
        }
        ctx.fill();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Panel grid
        ctx.strokeStyle = `${accent}55`;
        ctx.lineWidth = 0.8;
        for (let gy = -pH + 7; gy < pH; gy += 9) {
            ctx.beginPath(); ctx.moveTo(px - pW, gy); ctx.lineTo(px + pW, gy); ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(px, -pH); ctx.lineTo(px, pH); ctx.stroke();
    });

    // Connecting struts
    ctx.strokeStyle = '#3a4a5c'; ctx.lineWidth = isBomber ? 6 : 4;
    ctx.beginPath(); ctx.moveTo(-pX, 0); ctx.lineTo(pX, 0); ctx.stroke();

    // Ball cockpit
    const r = isBomber ? 18 : 14;
    ctx.fillStyle = '#243040';
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#344050';
    ctx.beginPath(); ctx.arc(-3, -3, r - 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath(); ctx.arc(-2, -2, 3, 0, Math.PI); ctx.fill();

    ctx.restore();
}

function drawBullet(ctx: CanvasRenderingContext2D, b: Bullet) {
    if (b.enemy) {
        ctx.shadowColor = '#e74c3c'; ctx.shadowBlur = 8;
        ctx.fillStyle   = '#ff6060';
        ctx.beginPath(); ctx.arc(b.x, b.y, 4, 0, Math.PI * 2); ctx.fill();
    } else {
        ctx.shadowColor = '#00ff88'; ctx.shadowBlur = 10;
        ctx.fillStyle   = '#00ff88';
        ctx.fillRect(b.x, b.y - 2, 20, 4);
        ctx.fillStyle = '#bbffdd';
        ctx.fillRect(b.x, b.y - 1, 20, 2);
    }
    ctx.shadowBlur = 0;
}

function drawPowerup(ctx: CanvasRenderingContext2D, p: Powerup, frame: number) {
    ctx.save();
    ctx.translate(p.x, p.y);
    const pulse = Math.sin(frame * 0.09) * 3;
    if (p.type === 'food') {
        ctx.font = '26px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('🍕', 0, pulse);
    } else {
        ctx.strokeStyle = `rgba(80,160,255,${0.6 + Math.sin(frame * 0.1) * 0.3})`;
        ctx.lineWidth = 2; ctx.shadowColor = '#4af'; ctx.shadowBlur = 12 + Math.abs(pulse);
        ctx.beginPath(); ctx.arc(0, 0, 14 + pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(80,160,255,0.2)'; ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#8cf'; ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('⛨', 0, 0);
    }
    ctx.restore();
}

function explode(particles: Particle[], x: number, y: number, big: boolean) {
    const colors = ['#f39c12','#e74c3c','#f1c40f','#ffffff','#e67e22','#ff6b6b'];
    const n = big ? 30 : 16;
    for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const spd = Math.random() * (big ? 4.5 : 2.8) + 0.5;
        particles.push({
            x, y,
            vx: Math.cos(a) * spd,
            vy: Math.sin(a) * spd,
            life: big ? 50 : 32,
            maxLife: big ? 50 : 32,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * (big ? 5.5 : 3) + 1,
        });
    }
}

function spawnWave(wave: number): Enemy[] {
    const count = 3 + Math.floor(wave * 1.4);
    return Array.from({ length: count }, (_, i) => {
        const roll = Math.random();
        const type: Enemy['type'] = wave < 2 ? 'fighter'
            : roll < 0.5 ? 'fighter' : roll < 0.8 ? 'interceptor' : 'bomber';
        const spd = type === 'interceptor' ? 2.4 + wave * 0.28
                  : type === 'bomber'      ? 1.2 + wave * 0.1
                  : 1.7 + wave * 0.2;
        return {
            x: W + 70 + i * 95,
            y: 80 + Math.random() * (H - 160),
            vx: -spd,
            hp: type === 'bomber' ? 3 : type === 'interceptor' ? 2 : 1,
            maxHp: type === 'bomber' ? 3 : type === 'interceptor' ? 2 : 1,
            type, phase: Math.random() * Math.PI * 2,
            shootCd: type === 'bomber' ? 120 + Math.random() * 60 : 9999,
            id: Math.random(),
        };
    });
}

function makeStars(): Star[][] {
    return [
        Array.from({ length: 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, spd: 0.35, r: 0.7 })),
        Array.from({ length: 35 }, () => ({ x: Math.random() * W, y: Math.random() * H, spd: 0.85, r: 1.2 })),
        Array.from({ length: 18 }, () => ({ x: Math.random() * W, y: Math.random() * H, spd: 1.7,  r: 1.9 })),
    ];
}

// ── Component ─────────────────────────────────────────────────────────────────
const QUOTES = [
    '"La Force n\'était pas avec toi…"',
    '"Je suis ton manque de skill."',
    '"Impressionnant. Pas impressionnant du tout."',
    '"Tu as sous-estimé le côté obscur."',
    '"Ce n\'est pas la trajectoire que tu cherchais."',
];

export default function Game() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate  = useNavigate();
    const [phase, setPhase] = useState<'playing'|'gameover'>('playing');
    const [final, setFinal] = useState(0);
    const [hs,    setHs]    = useState(() => parseInt(localStorage.getItem('sw_hs2') || '0'));

    const g = useRef({
        playerY: H / 2,
        bullets: [] as Bullet[],
        enemies: [] as Enemy[],
        particles: [] as Particle[],
        powerups: [] as Powerup[],
        stars: makeStars(),
        score: 0, lives: 3, wave: 1, combo: 0,
        shootCd: 0, frame: 0, shake: 0, waveTimer: 0,
        shielded: false, shieldTimer: 0,
        keys: { up: false, down: false, fire: false },
        over: false, raf: 0,
    });

    const restart = () => {
        const s = g.current;
        Object.assign(s, {
            playerY: H / 2, bullets: [], enemies: [], particles: [], powerups: [],
            stars: makeStars(), score: 0, lives: 3, wave: 1, combo: 0,
            shootCd: 0, frame: 0, shake: 0, waveTimer: 0,
            shielded: false, shieldTimer: 0,
            keys: { up: false, down: false, fire: false },
            over: false,
        });
        setPhase('playing');
    };

    useEffect(() => {
        if (phase !== 'playing') return;
        const s = g.current;
        s.over = false;
        s.enemies = spawnWave(1);

        const loop = () => {
            if (s.over) return;
            const ctx = canvasRef.current?.getContext('2d');
            if (!ctx) return;

            s.frame++;

            // Player
            if (s.keys.up   && s.playerY > 58)      s.playerY -= PSPD;
            if (s.keys.down && s.playerY < H - 58)  s.playerY += PSPD;

            // Shoot
            if (s.keys.fire && s.shootCd <= 0) {
                s.shootCd = 12;
                s.bullets.push({ x: PX + 44, y: s.playerY - 29, vx: 15, vy: 0, enemy: false });
                s.bullets.push({ x: PX + 44, y: s.playerY + 29, vx: 15, vy: 0, enemy: false });
            }
            if (s.shootCd > 0) s.shootCd--;
            if (s.shieldTimer > 0) { s.shieldTimer--; if (!s.shieldTimer) s.shielded = false; }

            // Move bullets
            s.bullets.forEach(b => { b.x += b.vx; b.y += b.vy; });
            s.bullets = s.bullets.filter(b => b.x > -30 && b.x < W + 30 && b.y > 0 && b.y < H);

            // Move enemies
            s.enemies.forEach(e => {
                e.x += e.vx;
                e.phase += 0.03;
                e.y += Math.sin(e.phase) * (e.type === 'bomber' ? 0.6 : 1.3);
                if (e.type === 'bomber') {
                    e.shootCd--;
                    if (e.shootCd <= 0) {
                        e.shootCd = 110 + Math.random() * 70;
                        const dx = PX - e.x, dy = s.playerY - e.y;
                        const d  = Math.sqrt(dx * dx + dy * dy);
                        s.bullets.push({ x: e.x - 22, y: e.y, vx: (dx / d) * 5, vy: (dy / d) * 5, enemy: true });
                    }
                }
            });

            // Bullet → enemy
            const dead = new Set<number>();
            s.bullets = s.bullets.filter(b => {
                if (b.enemy) return true;
                for (const e of s.enemies) {
                    if (dead.has(e.id)) continue;
                    if (Math.abs(b.x - e.x) < 40 && Math.abs(b.y - e.y) < 30) {
                        e.hp--;
                        if (e.hp <= 0) {
                            dead.add(e.id);
                            explode(s.particles, e.x, e.y, e.type === 'bomber');
                            s.combo++;
                            const mult = Math.max(1, Math.floor(s.combo / 3));
                            s.score += (e.type === 'bomber' ? 30 : e.type === 'interceptor' ? 20 : 10) * mult;
                            s.shake = 5;
                            if (Math.random() < 0.22)
                                s.powerups.push({ x: e.x, y: e.y, vy: 0.9, type: Math.random() < 0.65 ? 'food' : 'shield' });
                        }
                        return false;
                    }
                }
                return true;
            });
            s.enemies = s.enemies.filter(e => !dead.has(e.id) && e.x > -90);

            // Enemy → player
            const pl = PX - 38, pr = PX + 38, pt = s.playerY - 24, pb = s.playerY + 24;
            s.enemies = s.enemies.filter(e => {
                const hit = e.x < pr && e.x > pl && e.y > pt && e.y < pb;
                if (hit) {
                    if (!s.shielded) { s.lives--; s.shake = 14; s.combo = 0; explode(s.particles, PX, s.playerY, false); }
                    else explode(s.particles, e.x, e.y, false);
                    return false;
                }
                return true;
            });

            // Enemy bullets → player
            s.bullets = s.bullets.filter(b => {
                if (!b.enemy) return true;
                const hit = Math.abs(b.x - PX) < 36 && Math.abs(b.y - s.playerY) < 22;
                if (hit) {
                    if (!s.shielded) { s.lives--; s.shake = 12; s.combo = 0; }
                    return false;
                }
                return true;
            });

            // Powerups
            s.powerups.forEach(p => { p.y += p.vy; });
            s.powerups = s.powerups.filter(p => {
                if (p.y > H + 30) return false;
                const hit = Math.abs(p.x - PX) < 46 && Math.abs(p.y - s.playerY) < 32;
                if (hit) {
                    if (p.type === 'food')   { s.score += 50; s.combo++; }
                    if (p.type === 'shield') { s.shielded = true; s.shieldTimer = 300; }
                    return false;
                }
                return true;
            });

            // Particles
            s.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vx *= 0.93; p.vy *= 0.93; p.life--; });
            s.particles = s.particles.filter(p => p.life > 0);

            // Next wave
            if (s.enemies.length === 0) {
                s.waveTimer++;
                if (s.waveTimer > 90) { s.waveTimer = 0; s.wave++; s.enemies = spawnWave(s.wave); }
            }

            // Game over
            if (s.lives <= 0) {
                s.over = true;
                const best = Math.max(s.score, parseInt(localStorage.getItem('sw_hs2') || '0'));
                localStorage.setItem('sw_hs2', String(best));
                setHs(best); setFinal(s.score); setPhase('gameover');
                return;
            }

            // ── DRAW ───────────────────────────────────────────
            ctx.save();
            if (s.shake > 0) {
                ctx.translate((Math.random() - 0.5) * s.shake, (Math.random() - 0.5) * s.shake);
                s.shake = Math.max(0, s.shake - 1);
            }

            // Background
            ctx.fillStyle = '#020410';
            ctx.fillRect(-20, -20, W + 40, H + 40);

            // Parallax stars
            [0.38, 0.68, 1].forEach((bright, li) => {
                s.stars[li].forEach(st => {
                    st.x -= st.spd;
                    if (st.x < 0) { st.x = W; st.y = Math.random() * H; }
                    ctx.globalAlpha = bright;
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill();
                });
            });
            ctx.globalAlpha = 1;

            // Powerups
            s.powerups.forEach(p => drawPowerup(ctx, p, s.frame));

            // Particles
            s.particles.forEach(p => {
                ctx.globalAlpha = p.life / p.maxLife;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color; ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });
            ctx.globalAlpha = 1;

            // Enemies
            s.enemies.forEach(e => {
                if (e.maxHp > 1) {
                    ctx.fillStyle = 'rgba(0,0,0,0.5)';
                    ctx.fillRect(e.x - 22, e.y - 42, 44, 5);
                    ctx.fillStyle = e.hp === e.maxHp ? '#2ecc71' : '#e67e22';
                    ctx.fillRect(e.x - 22, e.y - 42, 44 * (e.hp / e.maxHp), 5);
                }
                drawTIE(ctx, e.x, e.y, e.type);
            });

            // Bullets
            s.bullets.forEach(b => drawBullet(ctx, b));

            // Player
            drawXWing(ctx, PX, s.playerY, s.frame, s.shielded);

            ctx.restore();

            // ── HUD (no shake) ─────────────────────────────────
            ctx.fillStyle = 'rgba(2,4,16,0.82)';
            ctx.fillRect(0, 0, W, 46);

            ctx.fillStyle = '#d4a843'; ctx.font = 'bold 16px Cinzel, serif';
            ctx.textAlign = 'left'; ctx.fillText(`Score : ${s.score}`, 14, 30);

            // Lives (X-Wing silhouette via triangles)
            for (let i = 0; i < s.lives; i++) {
                const lx = W / 2 - 35 + i * 36;
                ctx.fillStyle = '#d4a843';
                ctx.beginPath(); ctx.moveTo(lx + 10, 22); ctx.lineTo(lx, 34); ctx.lineTo(lx + 20, 34); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#f0c96a';
                ctx.beginPath(); ctx.moveTo(lx + 10, 24); ctx.lineTo(lx + 3, 33); ctx.lineTo(lx + 17, 33); ctx.closePath(); ctx.fill();
            }

            ctx.fillStyle = '#d4a843'; ctx.font = 'bold 15px Cinzel, serif';
            ctx.textAlign = 'right'; ctx.fillText(`Vague ${s.wave}`, W - 14, 30);
            ctx.textAlign = 'left';

            if (s.combo >= 3) {
                ctx.fillStyle = '#f0c96a';
                ctx.font = `bold ${14 + Math.min(s.combo, 8)}px Cinzel, serif`;
                ctx.textAlign = 'center';
                ctx.fillText(`✦ COMBO ×${s.combo} ✦`, W / 2, 64);
                ctx.textAlign = 'left';
            }

            if (s.shielded) {
                ctx.fillStyle = 'rgba(100,180,255,0.95)'; ctx.font = '12px Cinzel, serif';
                ctx.fillText(`⛨ BOUCLIER  ${Math.ceil(s.shieldTimer / 60)}s`, 14, 60);
            }

            if (s.enemies.length === 0 && s.waveTimer > 0) {
                const fade = 1 - s.waveTimer / 90;
                ctx.globalAlpha = fade;
                ctx.fillStyle = '#d4a843'; ctx.font = 'bold 26px Cinzel, serif';
                ctx.textAlign = 'center';
                ctx.fillText(`— VAGUE ${s.wave - 1} ÉLIMINÉE —`, W / 2, H / 2);
                ctx.globalAlpha = 1; ctx.textAlign = 'left';
            }

            s.raf = requestAnimationFrame(loop);
        };

        s.raf = requestAnimationFrame(loop);

        const down = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp'   || e.key === 'w') s.keys.up   = true;
            if (e.key === 'ArrowDown' || e.key === 's') s.keys.down = true;
            if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); s.keys.fire = true; }
        };
        const up = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp'   || e.key === 'w') s.keys.up   = false;
            if (e.key === 'ArrowDown' || e.key === 's') s.keys.down = false;
            if (e.key === ' ' || e.key === 'ArrowRight') s.keys.fire = false;
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup',   up);
        return () => { cancelAnimationFrame(s.raf); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
    }, [phase]);

    const quote = QUOTES[Math.floor((final * 13 + hs) % QUOTES.length)];

    return (
        <div className="sw-game">
            <div className="sw-game__header">
                <h1 className="sw-game__title">X-WING SQUADRON</h1>
                <p className="sw-game__sub">
                    <span>↑↓ / W·S</span> pour bouger &nbsp;·&nbsp; <span>ESPACE</span> pour tirer
                </p>
                {hs > 0 && <p className="sw-game__hs">🏆 Record : {hs}</p>}
            </div>

            {phase === 'playing' && (
                <canvas
                    ref={canvasRef}
                    className="sw-game__canvas"
                    width={W} height={H}
                    onTouchMove={e => {
                        const rect = canvasRef.current!.getBoundingClientRect();
                        g.current.playerY = Math.max(58, Math.min(H - 58, e.touches[0].clientY - rect.top));
                    }}
                    onTouchStart={() => { g.current.keys.fire = true; }}
                    onTouchEnd={()   => { g.current.keys.fire = false; }}
                />
            )}

            {phase === 'gameover' && (
                <div className="sw-go">
                    <div className="sw-go__stars">✦ ✦ ✦</div>
                    <h2 className="sw-go__title">GAME OVER</h2>
                    <p className="sw-go__quote">{quote}</p>
                    <div className="sw-go__scores">
                        <div className="sw-go__block">
                            <span className="sw-go__label">Score</span>
                            <span className="sw-go__val">{final}</span>
                        </div>
                        <div className="sw-go__block">
                            <span className="sw-go__label">Record</span>
                            <span className="sw-go__val sw-go__val--gold">{hs}</span>
                        </div>
                    </div>
                    <div className="sw-go__actions">
                        <button className="btn-filled" onClick={restart}>↺ Rejouer</button>
                        <button className="btn-outline" onClick={() => navigate('/')}>Quitter</button>
                    </div>
                </div>
            )}
        </div>
    );
}
