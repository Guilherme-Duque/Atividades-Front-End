import React, { useRef, useState, useEffect } from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";

const COLORS = ['#1e272e', '#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#9c88ff', '#ff6b81', '#576574'];

const GarticClone = () => {
  // Estados do Jogo
  const [gameState, setGameState] = useState('write');
  const [phrase, setPhrase] = useState('');
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [finalImage, setFinalImage] = useState(null);

  // Estados do Canvas e Ferramentas
  const canvasRef = useRef(null);
  const historyRef = useRef([]); // Guarda as "fotos" do canvas para o botão Voltar
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [isEraser, setIsEraser] = useState(false);

  // ---------------------------------------------------------
  // LÓGICA DO CRONÔMETRO
  // ---------------------------------------------------------
  useEffect(() => {
    let timer;
    if (gameState === 'draw' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'draw' && timeLeft === 0) {
      finishDrawing();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // ---------------------------------------------------------
  // INICIALIZAÇÃO DO CANVAS
  // ---------------------------------------------------------
  useEffect(() => {
    if (gameState === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.lineJoin = 'round';
      
      // Pinta o fundo de branco
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Salva o quadro em branco como a primeira ação do histórico
      historyRef.current = [context.getImageData(0, 0, canvas.width, canvas.height)];
    }
  }, [gameState]);

  // ---------------------------------------------------------
  // LÓGICA DE DESENHO E HISTÓRICO
  // ---------------------------------------------------------
  const saveStateToHistory = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    historyRef.current.push(context.getImageData(0, 0, canvas.width, canvas.height));
  };

  const undo = () => {
    // Só volta se houver mais do que apenas a tela em branco inicial
    if (historyRef.current.length > 1) {
      historyRef.current.pop(); // Remove o erro atual
      const previousState = historyRef.current[historyRef.current.length - 1]; // Pega o anterior
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.putImageData(previousState, 0, 0); // Restaura na tela
    }
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    
    // Configura pincel ou borracha
    context.strokeStyle = isEraser ? '#ffffff' : currentColor;
    context.lineWidth = isEraser ? 20 : 5; // Borracha é mais grossa

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const context = canvasRef.current.getContext('2d');
      context.closePath();
      setIsDrawing(false);
      saveStateToHistory(); // Salva o estado logo após terminar o traço
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    saveStateToHistory(); // Limpar também é uma ação que pode ser desfeita
  };

  const finishDrawing = () => {
    const canvas = canvasRef.current;
    const base64Image = canvas.toDataURL('image/png');
    setFinalImage(base64Image);
    setGameState('result');
  };

  // ---------------------------------------------------------
  // TRANSIÇÕES
  // ---------------------------------------------------------
  const startDrawPhase = (e) => {
    e.preventDefault();
    if (!phrase.trim()) return alert("Digite uma frase!");
    setTimeLeft(timeLimit);
    setGameState('draw');
  };

  const resetGame = () => {
    setPhrase('');
    setTimeLimit(60);
    setFinalImage(null);
    historyRef.current = [];
    setIsEraser(false);
    setGameState('write');
  };

  // ---------------------------------------------------------
  // RENDERIZAÇÃO
  // ---------------------------------------------------------
  if (gameState === 'write') {
    return (
      <div style={styles.container}>
        <h2>Fase 1: Escolha a Frase</h2>
        <p>Jogador 1, escreva algo difícil para o Jogador 2 desenhar!</p>
        <form onSubmit={startDrawPhase} style={styles.form}>
          <input 
            type="text" 
            placeholder="Ex: Um gato lendo um livro..."
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            style={styles.input}
            autoFocus
          />
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold' }}>Tempo limite (segundos):</label>
            <input 
              type="number" 
              min="10" 
              max="300"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              style={{ ...styles.input, width: '80px' }}
            />
          </div>
          <button type="submit" style={styles.buttonPrimary}>Confirmar e Passar a Vez</button>
        </form>
      </div>
    );
  }

  if (gameState === 'draw') {
    return (
      <div style={styles.container}>
        <h2>Fase 2: Hora de Desenhar!</h2>
        
        <div style={styles.headerDraw}>
          <h3 style={{ margin: 0, color: '#e1b12c' }}>⏳ Tempo Restante: {timeLeft}s</h3>
          <p style={{ margin: '10px 0', fontSize: '1.2rem' }}>Você precisa desenhar: <strong>{phrase}</strong></p>
        </div>

        {/* BARRA DE FERRAMENTAS */}
        <div style={styles.toolbar}>
          <div style={styles.palette}>
            {COLORS.map(color => (
              <button
                key={color}
                onClick={() => { setCurrentColor(color); setIsEraser(false); }}
                style={{
                  ...styles.colorBtn,
                  backgroundColor: color,
                  border: (!isEraser && currentColor === color) ? '3px solid #333' : '2px solid transparent'
                }}
              />
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setIsEraser(true)} 
              style={{...styles.toolBtn, backgroundColor: isEraser ? '#dfe6e9' : '#fff'}}
            >
              🧹 Borracha
            </button>
            <button onClick={undo} style={styles.toolBtn}>↩️ Voltar</button>
            <button onClick={clearCanvas} style={styles.toolBtn}>🗑️ Limpar</button>
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          width={700}
          height={400}
          style={styles.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        <button onClick={finishDrawing} style={{ ...styles.buttonSuccess, marginTop: '20px' }}>
          Já terminei!
        </button>
      </div>
    );
  }

  if (gameState === 'result') {
    return (
      <div style={styles.container}>
        <h2>Fase 3: Resultado Final</h2>
        <p style={{ fontSize: '1.5rem' }}><strong>Frase:</strong> {phrase}</p>
        <div style={{ border: '3px solid #ced6e0', padding: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <img src={finalImage} alt="Desenho Final" style={{ maxWidth: '100%' }} />
        </div>
        <button onClick={resetGame} style={{ ...styles.buttonPrimary, marginTop: '20px' }}>
          Jogar Novamente
        </button>
      </div>
    );
  }
};

// ---------------------------------------------------------
// ESTILOS
// ---------------------------------------------------------
const styles = {
  container: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'sans-serif',
    color: '#333', backgroundColor: '#fff', padding: '30px', borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)', maxWidth: '800px', width: '100%', textAlign: 'center'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '500px', marginTop: '20px' },
  input: { padding: '12px', fontSize: '1rem', borderRadius: '6px', border: '2px solid #dfe4ea', outline: 'none' },
  headerDraw: { backgroundColor: '#f1f2f6', padding: '15px', borderRadius: '8px', width: '100%', marginBottom: '15px' },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '700px', marginBottom: '10px' },
  palette: { display: 'flex', gap: '8px' },
  colorBtn: { width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', padding: 0 },
  toolBtn: { padding: '8px 12px', border: '2px solid #ced6e0', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: '#fff' },
  canvas: { border: '3px solid #ced6e0', borderRadius: '8px', cursor: 'crosshair', backgroundColor: '#fff' },
  buttonPrimary: { padding: '12px 25px', backgroundColor: '#3742fa', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' },
  buttonSuccess: { padding: '12px 30px', backgroundColor: '#2ed573', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' }
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<GarticClone />);