import { test, expect } from '@playwright/test'

test('renders demo with nexus canvases', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /Controles Basicos|Controles Basicos|Controles Básicos/i })).toBeVisible()

  const canvases = page.locator('canvas')
  const count = await canvases.count()
  expect(count).toBeGreaterThan(0)
})

test('sequencer and matrix labels are visible', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText(/Matriz de Botones \(5x5\)/i)).toBeVisible()
  await expect(page.getByText(/Secuenciador \(5x10\)/i)).toBeVisible()
})
