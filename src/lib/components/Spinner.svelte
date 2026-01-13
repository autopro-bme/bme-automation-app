<script>
  export let active = false;
</script>

{#if active}
  <div class="spinner-overlay" role="status" aria-live="polite">
    <div class="spinner">
      <div class="dots" aria-hidden="true">
        <span class="dot" style="--angle:-150deg; --i:0"></span>
        <span class="dot" style="--angle:-120deg; --i:1"></span>
        <span class="dot" style="--angle:-90deg; --i:2"></span>
        <span class="dot" style="--angle:-60deg; --i:3"></span>
        <span class="dot" style="--angle:-30deg; --i:4"></span>
        <span class="dot" style="--angle:0deg; --i:5"></span>
        <span class="dot" style="--angle:30deg; --i:6"></span>
        <span class="dot" style="--angle:60deg; --i:7"></span>
        <span class="dot" style="--angle:90deg; --i:8"></span>
        <span class="dot" style="--angle:120deg; --i:9"></span>
        <span class="dot" style="--angle:150deg; --i:10"></span>
        <span class="dot" style="--angle:180deg; --i:11"></span>
      </div>
      <img src="/src/images/bme_logo.jpg" alt="BME" class="spinner-logo" />
    </div>
  </div>
{/if}

<style>
  .spinner-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    z-index: 9999;
  }

  .spinner {
     --spinner-size: 220px;
     --dot-size: 16px;
     width: var(--spinner-size);
     height: var(--spinner-size);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dots {
    position: absolute;
    inset: 0;
    display: block;
    pointer-events: none;
  }

  .dot {
     width: var(--dot-size);
     height: var(--dot-size);
    background: #091747;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    --radius: calc(var(--spinner-size) / 2 - 18px);
    transform: rotate(var(--angle)) translateY(calc(-1 * var(--radius))) translateX(-50%) scale(0.35);
    opacity: 0.25;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    animation: pop 1.2s infinite cubic-bezier(.2,.6,.2,1);
    animation-delay: calc(var(--i) * 0.12s);
  }

  .spinner-logo {
    width: 68%;
    height: 68%;
    padding: 10px;
    object-fit: contain;
    border-radius: 4px;
    position: relative;
    z-index: -1;
  }

  @keyframes pop {
    0% { transform: rotate(var(--angle)) translateY(calc(-1 * var(--radius))) translateX(-50%) scale(0.35); opacity: 0.25; }
    40% { transform: rotate(var(--angle)) translateY(calc(-1 * var(--radius))) translateX(-50%) scale(1); opacity: 1; }
    80% { transform: rotate(var(--angle)) translateY(calc(-1 * var(--radius))) translateX(-50%) scale(0.5); opacity: 0.45; }
    100% { transform: rotate(var(--angle)) translateY(calc(-1 * var(--radius))) translateX(-50%) scale(0.35); opacity: 0.25; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
