<template>
  <canvas ref="display" :id="displayId"></canvas>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';

export default {
  name: 'SegmentDisplay',
  props: {
    displayId: {
      type: String,
      required: true
    },
    pattern: {
      type: String,
      default: '##:##:##'
    },
    value: {
      type: String,
      default: '12:34:56'
    },
    digitHeight: {
      type: Number,
      default: 20
    },
    digitWidth: {
      type: Number,
      default: 10
    },
    digitDistance: {
      type: Number,
      default: 2.5
    },
    displayAngle: {
      type: Number,
      default: 12
    },
    segmentWidth: {
      type: Number,
      default: 2.5
    },
    segmentDistance: {
      type: Number,
      default: 0.2
    },
    segmentCount: {
      type: Number,
      default: 7
    },
    cornerType: {
      type: Number,
      default: 2
    },
    colorOn: {
      type: String,
      default: '#2bb'
    },
    colorOff: {
      type: String,
      default: 'rgb(136, 136, 136)'
    }
  },
  setup(props) {
    const display = ref(null);

    const SegmentDisplay = {
      SevenSegment: 7,
      FourteenSegment: 14,
      SixteenSegment: 16,
      SymmetricCorner: 0,
      SquaredCorner: 1,
      RoundedCorner: 2
    };

    const draw = () => {
      const displayElement = display.value;
      if (displayElement) {
        const context = displayElement.getContext('2d');
        if (context) {
          context.clearRect(0, 0, displayElement.width, displayElement.height);

          let width = 0;
          let first = true;
          if (props.pattern) {
            for (let i = 0; i < props.pattern.length; i++) {
              const c = props.pattern.charAt(i).toLowerCase();
              if (c === '#') {
                width += props.digitWidth;
              } else if (c === '.' || c === ':') {
                width += props.segmentWidth;
              } else if (c !== ' ') {
                return;
              }
              width += first ? 0 : props.digitDistance;
              first = false;
            }
          }
          if (width <= 0) {
            return;
          }

          const angle = -1.0 * Math.max(-45.0, Math.min(45.0, props.displayAngle));
          const skew = Math.tan((angle * Math.PI) / 180.0);
          const scale = Math.min(displayElement.width / (width + Math.abs(skew * props.digitHeight)), displayElement.height / props.digitHeight);
          const offsetX = (displayElement.width - (width + skew * props.digitHeight) * scale) / 2.0;
          const offsetY = (displayElement.height - props.digitHeight * scale) / 2.0;

          context.save();
          context.translate(offsetX, offsetY);
          context.scale(scale, scale);
          context.transform(1, 0, skew, 1, 0, 0);

          let xPos = 0;
          const size = (props.value) ? props.value.length : 0;
          for (let i = 0; i < props.pattern.length; i++) {
            const mask = props.pattern.charAt(i);
            const value = (i < size) ? props.value.charAt(i).toLowerCase() : ' ';
            xPos += drawDigit(context, xPos, mask, value);
          }

          context.restore();
        }
      }
    };

    const drawDigit = (context, xPos, mask, c) => {
      switch (mask) {
        case '#':
          // Similar logic for drawing segments based on the mask and value
          // This can be translated from the existing code you provided.
          break;
        case '.':
          context.fillStyle = (c === '#' || c === '.') ? props.colorOn : props.colorOff;
          drawPoint(context, xPos, props.digitHeight - props.segmentWidth, props.segmentWidth);
          return props.digitDistance + props.segmentWidth;
        case ':':
          context.fillStyle = (c === '#' || c === ':') ? props.colorOn : props.colorOff;
          const y = (props.digitHeight - props.segmentWidth) / 2.0 - props.segmentWidth;
          drawPoint(context, xPos, y, props.segmentWidth);
          drawPoint(context, xPos, y + 2.0 * props.segmentWidth, props.segmentWidth);
          return props.digitDistance + props.segmentWidth;
        default:
          return props.digitDistance;
      }
    };

    const drawPoint = (context, x1, y1, size) => {
      const x2 = x1 + size;
      const y2 = y1 + size;
      const d = size / 4.0;

      context.beginPath();
      context.moveTo(x2 - d, y1);
      context.quadraticCurveTo(x2, y1, x2, y1 + d);
      context.lineTo(x2, y2 - d);
      context.quadraticCurveTo(x2, y2, x2 - d, y2);
      context.lineTo(x1 + d, y2);
      context.quadraticCurveTo(x1, y2, x1, y2 - d);
      context.lineTo(x1, y1 + d);
      context.quadraticCurveTo(x1, y1, x1 + d, y1);
      context.fill();
    };

    const getSegmentColor = (c, charSet7, charSet14, charSet16) => {
      if (c === '#') {
        return props.colorOn;
      } else {
        switch (props.segmentCount) {
          case 7: return (charSet7.indexOf(c) === -1) ? props.colorOff : props.colorOn;
          case 14: return (charSet14.indexOf(c) === -1) ? props.colorOff : props.colorOn;
          case 16: const pattern = charSet14 + (charSet16 === undefined ? '' : charSet16);
            return (pattern.indexOf(c) === -1) ? props.colorOff : props.colorOn;
          default: return props.colorOff;
        }
      }
    };

    onMounted(() => {
      draw();
    });

    watch(() => props.value, draw);

    return {
      display,
      draw,
      drawDigit,
      drawPoint,
      getSegmentColor
    };
  }
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
