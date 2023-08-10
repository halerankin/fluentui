import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Divider } from './divider.js';

test.describe('Divider', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-divider');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-divider--divider'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set a default `role` attribute of "separator"', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-divider></fluent-divider>
            `;
    });

    await expect(element).toHaveAttribute('role', 'separator');
  });

  test('should set the `role` attribute equal to the role provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-divider role="presentation"></fluent-divider>
            `;
    });

    await expect(element).toHaveAttribute('role', 'presentation');

    await element.evaluate((node: Divider) => {
      node.role = 'separator';
    });

    await expect(element).toHaveAttribute('role', 'separator');
  });

  test('should set the `aria-orientation` attribute equal to the `orientation` value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-divider orientation="vertical"></fluent-divider>
            `;
    });

    await expect(element).toHaveJSProperty('ariaOrientation', 'vertical');

    await element.evaluate((node: Divider) => {
      node.orientation = 'horizontal';
    });

    await expect(element).toHaveJSProperty('ariaOrientation', 'horizontal');
  });

  // These test fail for Fluent Divider because aria-orientation is set regardless of role. Something is broken.
  test('should NOT set the `aria-orientation` attribute equal to the `orientation` value if the `role` is presentational', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-divider orientation="vertical"></fluent-divider>
            `;
    });

    await expect(element).toHaveAttribute('aria-orientation', 'vertical');

    await element.evaluate((node: Divider) => {
      node.role = 'presentation';
    });

    await expect(element).not.toHaveAttribute('aria-orientation', 'horizontal');
    await expect(element).not.toHaveAttribute('aria-orientation', 'vertical');
  });

  test('should initialize to the provided value attribute if set post-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
              <fluent-divider></fluent-divider>
          `;
    });

    await element.evaluate((node: Divider) => {
      node.alignContent = 'start';
    });

    await expect(element).toHaveJSProperty('alignContent', 'start');

    await element.evaluate((node: Divider) => {
      node.alignContent = 'center';
    });

    await expect(element).toHaveJSProperty('alignContent', 'center');

    await element.evaluate((node: Divider) => {
      node.alignContent = 'end';
    });

    await expect(element).toHaveJSProperty('alignContent', 'end');

    await element.evaluate((node: Divider) => {
      node.appearance = 'default';
    });

    await expect(element).toHaveJSProperty('appearance', 'default');

    await element.evaluate((node: Divider) => {
      node.appearance = 'strong';
    });

    await expect(element).toHaveJSProperty('appearance', 'strong');

    await element.evaluate((node: Divider) => {
      node.appearance = 'brand';
    });

    await expect(element).toHaveJSProperty('appearance', 'brand');
    await element.evaluate((node: Divider) => {
      node.appearance = 'subtle';
    });

    await expect(element).toHaveJSProperty('appearance', 'subtle');

    await element.evaluate((node: Divider) => {
      node.inset = true;
    });

    await expect(element).toHaveJSProperty('inset', true);
  });
});