<template>
  <div class="aplicacion-principal">
    <!-- Contenedor principal de la demostración de componentes Nexus -->
    <div class="contenedor-componentes">
      
      <!-- Reloj digital con display de 7 segmentos -->
      <div class="seccion-reloj">
        <h2 class="titulo-seccion">Reloj Digital</h2>
        <div class="display-reloj">{{ horaActual }}</div>
      </div>

      <!-- Sección de controles básicos -->
      <div class="seccion-controles-basicos">
        <h2 class="titulo-seccion">Controles Básicos</h2>
        <div class="grupo-controles">
          <div class="control-item">
            <label>Interruptor Toggle</label>
            <div class="componente-nexus" ref="toggleContainer"></div>
          </div>
          
          <div class="control-item">
            <label>Botón Interactivo</label>
            <div class="componente-nexus" ref="buttonContainer"></div>
          </div>
          
          <div class="control-item">
            <label>Botón de Reproducción</label>
            <div class="componente-nexus" ref="playButtonContainer"></div>
          </div>
        </div>
      </div>

      <!-- Sección de controles deslizantes -->
      <div class="seccion-deslizantes">
        <h2 class="titulo-seccion">Controles Deslizantes</h2>
        <div class="grupo-controles">
          <div class="control-item">
            <label>Deslizador Horizontal</label>
            <div class="componente-nexus" ref="sliderContainer"></div>
          </div>
          
          <div class="control-item">
            <label>Deslizador Múltiple</label>
            <div class="componente-nexus" ref="multisliderContainer"></div>
          </div>
          
          <div class="control-item">
            <label>Control Circular</label>
            <div class="componente-nexus" ref="dialContainer"></div>
          </div>
        </div>
      </div>

      <!-- Sección de componentes de audio -->
      <div class="seccion-audio">
        <h2 class="titulo-seccion">Componentes de Audio</h2>
        <div class="grupo-controles">
          <div class="control-item piano-container">
            <label>Piano Virtual</label>
            <div class="componente-nexus" ref="pianoContainer"></div>
          </div>
        </div>
      </div>

      <!-- Sección de controles avanzados -->
      <div class="seccion-avanzados">
        <h2 class="titulo-seccion">Controles Avanzados</h2>
        <div class="grupo-controles">
          <div class="control-item">
            <label>Envolvente ADSR</label>
            <Envelope 
              @change="manejarCambio" 
              :points="puntosEnvolvente"
              :size="tamañoEnvolvente" 
              :duration="1" 
              :loop="false" 
              :noNewPoints="true" 
            />
          </div>
          
          <div class="control-item">
            <label>Control de Posición XY</label>
            <Position @change="manejarCambio" :size="tamañoPosicion" />
          </div>
          
          <div class="control-item">
            <label>Entrada Numérica</label>
            <Number @change="manejarCambio" :size="tamañoNumero" />
          </div>
        </div>
      </div>

      <!-- Sección de selección y matrices -->
      <div class="seccion-seleccion">
        <h2 class="titulo-seccion">Selección y Matrices</h2>
        <div class="grupo-controles">
          <div class="control-item">
            <label>Botones de Radio</label>
            <Radio 
              @change="manejarCambio" 
              :size="tamañoRadio" 
              :numberOfButtons="4" 
            />
          </div>
          
          <div class="control-item">
            <label>Lista Desplegable</label>
            <Select 
              @change="manejarCambio" 
              :size="tamañoSelect" 
              :options="opcionesSelect" 
            />
          </div>
          
          <div class="control-item">
            <label>Matriz de Botones (5x5)</label>
            <Matrix 
              @change="manejarCambio" 
              :size="tamañoMatriz" 
              :rows="5" 
              :columns="5" 
            />
          </div>
        </div>
      </div>

      <!-- Sección de sensores y medidores -->
      <div class="seccion-sensores">
        <h2 class="titulo-seccion">Sensores y Medidores</h2>
        <div class="grupo-controles">
          <div class="control-item">
            <label>Sensor de Inclinación</label>
            <Tilt @change="manejarCambio" :size="tamañoInclinacion" />
          </div>
          
          <div class="control-item">
            <label>Medidor de Nivel</label>
            <Meter :size="tamañoMedidor" />
          </div>
        </div>
      </div>

      <!-- Sección de visualización -->
      <div class="seccion-visualizacion">
        <h2 class="titulo-seccion">Visualización</h2>
        <div class="grupo-controles">
          <div class="control-item">
            <label>Osciloscopio</label>
            <Oscilloscope :size="tamañoOsciloscopio" />
          </div>
          
          <div class="control-item">
            <label>Espectrograma</label>
            <Spectrogram :size="tamañoEspectrograma" />
          </div>
          
          <div class="control-item">
            <label>Secuenciador (5x10)</label>
            <Sequencer 
              @change="manejarCambio" 
              @step="manejarCambio" 
              :size="tamañoSecuenciador" 
              :rows="5" 
              :columns="10" 
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// Importación de utilidades
import { ref, onMounted, onUnmounted } from 'vue'
import * as Nexus from 'nexusui'

// Importación de componentes avanzados
import Envelope from "./components/nexus/Envelope.vue"
import Position from "./components/nexus/Position.vue"
import Number from "./components/nexus/Number.vue"

// Importación de componentes de selección
import Radio from "./components/nexus/Radio.vue"
import Select from "./components/nexus/Select.vue"
import Matrix from "./components/nexus/Matrix.vue"

// Importación de sensores y medidores
import Tilt from "./components/nexus/Tilt.vue"
import Meter from "./components/nexus/Meter.vue"

// Importación de componentes de visualización
import Oscilloscope from "./components/nexus/Oscilloscope.vue"
import Sequencer from "./components/nexus/Sequencer.vue"
import Spectrogram from "./components/nexus/Spectrogram.vue"

// ===== VARIABLES REACTIVAS =====
// Hora actual para el reloj digital
const horaActual = ref('')

// Referencias a contenedores de componentes
const toggleContainer = ref(null)
const buttonContainer = ref(null)
const playButtonContainer = ref(null)
const sliderContainer = ref(null)
const multisliderContainer = ref(null)
const dialContainer = ref(null)
const pianoContainer = ref(null)

// Variables para almacenar las instancias de los componentes
let componentesNexus = {}

// ===== CONFIGURACIÓN DE TAMAÑOS =====

// Tamaños para controles básicos
const tamañoBoton = [30, 30]
const tamañoBotónTexto = [150, 50]

// Tamaños para controles deslizantes
const tamañoDeslizante = [100, 30]
const tamañoMultiDeslizante = [280, 130]
const tamañoGiratorio = [200, 200]

// Tamaños para controles de audio
const tamañoPiano = [600, 100]
const tamañoPanorama = [200, 50]
const tamañoPanorama2D = [200, 200]

// Tamaños para controles avanzados
const tamañoEnvolvente = [300, 150]
const tamañoPosicion = [200, 200]
const tamañoNumero = [100, 50]

// Tamaños para selección y matrices
const tamañoRadio = [200, 50]
const tamañoSelect = [200, 50]
const tamañoMatriz = [200, 200]

// Tamaños para sensores
const tamañoInclinacion = [200, 50]
const tamañoMedidor = [30, 100]

// Tamaños para visualización
const tamañoOsciloscopio = [300, 150]
const tamañoEspectrograma = [300, 150]
const tamañoSecuenciador = [400, 200]

// ===== DATOS DE CONFIGURACIÓN =====

// Valores iniciales para el multi-deslizante
const valoresMultiDeslizante = [10, 20, 30, 40, 50]

// Puntos de la envolvente ADSR (Attack, Decay, Sustain, Release)
const puntosEnvolvente = [
  { x: 0.1, y: 0 },    // Inicio
  { x: 0.2, y: 1 },    // Attack
  { x: 0.5, y: 0.5 },  // Decay/Sustain
  { x: 1, y: 0 }       // Release
]

// Opciones para el componente Select
const opcionesSelect = ['Opción 1', 'Opción 2', 'Opción 3']

// ===== FUNCIONES DE CREACIÓN DE COMPONENTES =====
/**
 * Crea todos los componentes Nexus UI
 */
const crearComponentes = () => {
  // Toggle
  if (toggleContainer.value) {
    componentesNexus.toggle = new Nexus.Toggle(toggleContainer.value, {
      size: [30, 30],
      state: false
    })
    componentesNexus.toggle.on('change', (v) => console.log('Toggle:', v))
  }
  
  // Button
  if (buttonContainer.value) {
    componentesNexus.button = new Nexus.Button(buttonContainer.value, {
      size: [30, 30],
      mode: 'button'
    })
    componentesNexus.button.on('change', (v) => console.log('Button:', v))
  }
  
  // TextButton
  if (playButtonContainer.value) {
    componentesNexus.textButton = new Nexus.TextButton(playButtonContainer.value, {
      size: [150, 50],
      text: 'Reproducir'
    })
    componentesNexus.textButton.on('change', (v) => console.log('TextButton:', v))
  }
  
  // Slider
  if (sliderContainer.value) {
    componentesNexus.slider = new Nexus.Slider(sliderContainer.value, {
      size: [100, 30],
      mode: 'relative',
      min: 0,
      max: 1,
      step: 0,
      value: 0.5
    })
    componentesNexus.slider.on('change', (v) => console.log('Slider:', v))
  }
  
  // Multislider
  if (multisliderContainer.value) {
    componentesNexus.multislider = new Nexus.Multislider(multisliderContainer.value, {
      size: [280, 130],
      numberOfSliders: 5,
      min: 0,
      max: 1,
      step: 0,
      values: [0.1, 0.3, 0.5, 0.7, 0.9]
    })
    componentesNexus.multislider.on('change', (v) => console.log('Multislider:', v))
  }
  
  // Dial
  if (dialContainer.value) {
    componentesNexus.dial = new Nexus.Dial(dialContainer.value, {
      size: [200, 200],
      interaction: 'radial',
      mode: 'relative',
      min: 0,
      max: 1,
      step: 0,
      value: 0.5
    })
    componentesNexus.dial.on('change', (v) => console.log('Dial:', v))
  }
  
  // Piano
  if (pianoContainer.value) {
    componentesNexus.piano = new Nexus.Piano(pianoContainer.value, {
      size: [600, 100],
      mode: 'button',
      lowNote: 24,
      highNote: 96
    })
    componentesNexus.piano.on('change', (v) => console.log('Piano:', v))
  }
}

// ===== MÉTODOS =====

/**
 * Manejador universal para cambios en todos los componentes
 * Registra los valores en la consola para depuración
 * @param {any} valor - El valor emitido por el componente
 */
const manejarCambio = (valor) => {
  console.log('Cambio detectado:', valor)
}

/**
 * Actualiza la hora actual cada segundo
 * Formatea la hora en formato local legible
 */
const actualizarHora = () => {
  horaActual.value = new Date().toLocaleTimeString('es-ES', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// ===== CICLO DE VIDA DEL COMPONENTE =====
// Intervalo para actualizar el reloj
let intervaloReloj = null

/**
 * Configuración inicial cuando el componente se monta
 */
onMounted(() => {
  // Inicializar el reloj digital
  actualizarHora()
  intervaloReloj = setInterval(actualizarHora, 1000)
  
  // Crear componentes Nexus UI después de que el DOM esté listo
  setTimeout(crearComponentes, 100)
  
  console.log('Aplicación de demostración Nexus UI iniciada')
})

/**
 * Limpieza cuando el componente se desmonta
 */
onUnmounted(() => {
  // Limpiar el intervalo del reloj
  if (intervaloReloj) {
    clearInterval(intervaloReloj)
  }
  
  // Destruir componentes Nexus UI
  Object.values(componentesNexus).forEach(component => {
    if (component && component.destroy) {
      component.destroy()
    }
  })
  
  console.log('Aplicación de demostración Nexus UI finalizada')
})

</script>

<style scoped>
/* Importación de fuente para display de 7 segmentos */
@import url('https://fonts.cdnfonts.com/css/seven-segment');

/* ===== CONTENEDOR PRINCIPAL ===== */
.aplicacion-principal {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.contenedor-componentes {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ===== SECCIONES ===== */
.seccion-reloj,
.seccion-controles-basicos,
.seccion-deslizantes,
.seccion-audio,
.seccion-avanzados,
.seccion-seleccion,
.seccion-sensores,
.seccion-visualizacion {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 10px;
  background: #f8f9fa;
  border-left: 4px solid #007bff;
}

.titulo-seccion {
  color: #2c3e50;
  font-size: 1.5em;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
}

/* ===== RELOJ DIGITAL ===== */
.seccion-reloj {
  text-align: center;
  background: #2c3e50;
  color: white;
  border-left: 4px solid #00d4aa;
}

.display-reloj {
  font-family: 'Seven Segment', monospace;
  font-size: 3.5em;
  color: #00d4aa;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  display: inline-block;
  min-width: 300px;
  border: 1px solid #333;
}

/* ===== GRUPOS DE CONTROLES ===== */
.grupo-controles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  align-items: start;
}

.control-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.control-item label {
  display: block;
  font-weight: 600;
  color: #495057;
  margin-bottom: 15px;
  font-size: 0.95em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== CONTENEDOR ESPECIAL PARA PIANO ===== */
.piano-container {
  grid-column: 1 / -1; /* Ocupa todo el ancho disponible */
  min-width: 100%;
}

/* ===== SECCIONES ESPECÍFICAS ===== */
.seccion-controles-basicos {
  border-left-color: #28a745;
}

.seccion-deslizantes {
  border-left-color: #ffc107;
}

.seccion-audio {
  border-left-color: #dc3545;
}

.seccion-avanzados {
  border-left-color: #6f42c1;
}

.seccion-seleccion {
  border-left-color: #fd7e14;
}

.seccion-sensores {
  border-left-color: #20c997;
}

.seccion-visualizacion {
  border-left-color: #6610f2;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .aplicacion-principal {
    padding: 10px;
  }
  
  .contenedor-componentes {
    padding: 20px;
  }
  
  .grupo-controles {
    grid-template-columns: 1fr;
  }
  
  .display-reloj {
    font-size: 2.5em;
    min-width: 250px;
  }
  
  .titulo-seccion {
    font-size: 1.3em;
  }
}

@media (max-width: 480px) {
  .display-reloj {
    font-size: 2em;
    min-width: 200px;
  }
  
  .control-item {
    padding: 15px;
  }
}

/* ===== ESTILOS PARA COMPONENTES NEXUS UI ===== */
.componente-nexus {
  margin: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
}

/* Estilos específicos para diferentes tipos de componentes */
.componente-nexus canvas {
  border-radius: 8px;
}

/* Ajustes uniformes para todos los componentes */
.componente-nexus {
  min-height: 100px;
  padding: 15px;
}

/* ===== RESPONSIVIDAD SIMPLIFICADA ===== */
@media (max-width: 768px) {
  .aplicacion-principal {
    padding: 10px;
  }
  
  .contenedor-componentes {
    padding: 20px;
  }
  
  .grupo-controles {
    grid-template-columns: 1fr;
  }
  
  .display-reloj {
    font-size: 2.5em;
    min-width: 250px;
  }
  
  .titulo-seccion {
    font-size: 1.3em;
  }
}

@media (max-width: 480px) {
  .display-reloj {
    font-size: 2em;
    min-width: 200px;
  }
  
  .control-item {
    padding: 15px;
  }
}
</style>
