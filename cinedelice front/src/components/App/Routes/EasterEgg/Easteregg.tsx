import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import playerImageSrc from './darkvador.png';
import foodImageSrc from './pizza.png';
import toxicImageSrc from './toxic.png';

import './Easteregg.scss';
import Encrage from '../Encrage/encrage';

const Game = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [playerX, setPlayerX] = useState(275);
    const [fallingObjects, setFallingObjects] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const navigate = useNavigate();

    // Taille du jeu
    const canvasWidth = 900;
    const canvasHeight = 700;

    // Variables de déplacement
    const playerSpeed = 15;
    const playerWidth = 120;
    const playerHeight = 170;

    // Variables pour stocker les images chargées
    const playerImage = useRef(new Image());
    const foodImage = useRef(new Image());
    const toxicImage = useRef(new Image());

    // Charger les images une seule fois au démarrage
    useEffect(() => {
        playerImage.current.src = playerImageSrc;
        foodImage.current.src = foodImageSrc;
        toxicImage.current.src = toxicImageSrc;
    }, []);

    const createFallingObject = () => {
        const isGood = Math.random() > 0.5;
        return {
            x: Math.random() * (canvasWidth - 30),
            y: -30,
            width: 50,
            height: 50,
            speed: Math.random() * 3 + 2,
            isGood,
        };
    };

    const checkCollision = (obj) => {
        return (
            playerX < obj.x + obj.width &&
            playerX + playerWidth > obj.x &&
            canvasHeight - playerHeight < obj.y + obj.height &&
            canvasHeight > obj.y
        );
    };

    const updateFallingObjects = () => {
        setFallingObjects((prevObjects) =>
            prevObjects
                .map((obj) => {
                    obj.y += obj.speed;
                    return obj;
                })
                .filter((obj) => obj.y < canvasHeight),
        );
    };

    const handleKeyDown = (e) => {
        if (isPaused || gameOver) return;

        if (e.key === 'ArrowLeft' && playerX > 0) {
            setPlayerX((prevX) => prevX - playerSpeed);
        } else if (
            e.key === 'ArrowRight' &&
            playerX < canvasWidth - playerWidth
        ) {
            setPlayerX((prevX) => prevX + playerSpeed);
        }
    };

    const drawGame = (ctx) => {
        // Effacer l'écran
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.drawImage(
            playerImage.current,
            playerX,
            canvasHeight - playerHeight,
            playerWidth,
            playerHeight,
        );

        fallingObjects.forEach((obj) => {
            const img = obj.isGood ? foodImage.current : toxicImage.current;
            ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height);
        });

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 30);
        ctx.fillText(`Lives: ${lives}`, canvasWidth - 100, 30);
    };

    const gameLoop = () => {
        if (isPaused || gameOver) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (Math.random() < 0.03) {
            setFallingObjects((prevObjects) => [
                ...prevObjects,
                createFallingObject(),
            ]);
        }

        setFallingObjects((prevObjects) =>
            prevObjects.filter((obj) => {
                if (checkCollision(obj)) {
                    if (obj.isGood) {
                        setScore((prevScore) => prevScore + 1);
                    } else {
                        setLives((prevLives) => prevLives - 1);
                    }
                    return false;
                }
                return true;
            }),
        );

        updateFallingObjects();

        drawGame(ctx);

        if (lives <= 0) {
            setGameOver(true);
        }
    };

    const togglePause = () => {
        setIsPaused((prevIsPaused) => !prevIsPaused);
    };

    const restartGame = () => {
        setScore(0);
        setLives(3);
        setFallingObjects([]);
        setPlayerX(275);
        setGameOver(false);
        setIsPaused(false);
    };

    useEffect(() => {
        const interval = setInterval(gameLoop, 1000 / 60);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [playerX, fallingObjects, score, lives, isPaused, gameOver]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Attrape la nourriture!</h1>

            {!gameOver ? (
                <>
                    <button onClick={togglePause}>
                        {isPaused ? 'Jouer' : 'Pause'}
                    </button>
                    <canvas
                        className="game-canvas"
                        ref={canvasRef}
                        width={canvasWidth}
                        height={canvasHeight}
                        style={{ border: '2px solid white' }}
                    />
                </>
            ) : (
                <div className="game-over-modal">
                    <h2>Game Over</h2>
                    <p>Voulez-vous rejouer ?</p>
                    <button onClick={restartGame}>Rejouer</button>
                    <button onClick={() => navigate('/')}>Quitter</button>{' '}
                </div>
            )}
            <Encrage></Encrage>
        </div>
    );
};

export default Game;
