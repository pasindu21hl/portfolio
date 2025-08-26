import asyncio
from playwright.sync_api import sync_playwright, expect, Page

def verify_particle_background(page: Page):
    """
    This script verifies that the new tsParticles background is rendering correctly.
    """
    # 1. Navigate to the home page
    page.goto("file:///app/index.html", wait_until="networkidle")

    # 2. Skip the intro loader
    page.get_by_role("button", name="Skip Intro").click()
    expect(page.locator("#loader")).not_to_be_visible()

    # 3. Wait for the main page content to be visible
    expect(page.get_by_role("heading", name="Hi, I’m Pasindu Heshan")).to_be_visible()

    # 4. Wait a moment for the particles to initialize and render
    page.wait_for_timeout(1500)

    # 4. Assert that the canvas element created by tsParticles exists
    particle_canvas = page.locator("#particle-background > canvas")
    expect(particle_canvas).to_be_visible()

    # 5. Take a screenshot
    page.screenshot(path="jules-scratch/verification/particle_background.png")

    print("Verification successful: Particle background canvas is present.")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_particle_background(page)
        browser.close()

if __name__ == "__main__":
    main()
