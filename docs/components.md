# Component API Reference

This document summarizes the public props and emitted events for the current wrappers.

## Core Controls

### Button
- Props: `mode`, `state`, `size`
- Events: `change`
- Exposed methods: `turnOn()`, `turnOff()`

### Toggle
- Props: `state`, `size`
- Events: `change`
- Exposed methods: `flip()`, `turnOn()`

### Dial
- Props: `modelValue`, `value`, `min`, `max`, `step`, `interaction`, `mode`, `size`
- Events: `change`, `update:modelValue`

### Slider
- Props: `modelValue`, `value`, `min`, `max`, `step`, `mode`, `size`
- Events: `change`, `update:modelValue`

### Number
- Props: `modelValue`, `value`, `min`, `max`, `step`, `size`
- Events: `change`, `update:modelValue`

### TextButton
- Props: `size`, `state`, `text`, `alternateText`
- Events: `change`

## Spatial Controls

### Position
- Props: `size`, `mode`, `x`, `y`, `minX`, `maxX`, `minY`, `maxY`
- Events: `change`

### Pan
- Props: `size`, `mode`, `min`, `max`, `step`, `value`
- Events: `change`

### Pan2D
- Props: `size`, `mode`, `x`, `y`, `minX`, `maxX`, `minY`, `maxY`
- Events: `change`

## Sequencing and Selection

### Matrix
- Props: `size`, `rows`, `columns`, `mode`
- Events: `change`

### Sequencer
- Props: `size`, `mode`, `rows`, `columns`
- Events: `change`, `step`

### Select
- Props: `size`, `options`
- Events: `change`

### Radio
- Props: `size`, `numberOfButtons`, `active`
- Events: `change`

### Multislider
- Props: `values`, `numberOfSliders`, `min`, `max`, `step`, `mode`, `size`
- Events: `change`

## Audio and Visualization

### Envelope
- Props: `points`, `size`, `duration`, `loop`, `noNewPoints`
- Events: `change`

### Piano
- Props: `mode`, `lowNote`, `highNote`, `size`
- Events: `change`
- Exposed methods: `toggleKey(key, value)`

### Meter
- Props: `size`
- Events: none
- Exposed refs: `meter`

### Oscilloscope
- Props: `size`
- Events: none
- Exposed refs: `oscilloscope`

### Spectrogram
- Props: `size`
- Events: none
- Exposed refs: `spectrogram`

### Tilt
- Props: `size`
- Events: `change`

### SegmentDisplay
- Props: `displayId`, `pattern`, `value`, `digitHeight`, `digitWidth`, `digitDistance`, `displayAngle`, `segmentWidth`, `segmentDistance`, `segmentCount`, `cornerType`, `colorOn`, `colorOff`
- Events: none
