<script>
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{minute}</div>
    <div class="info-bar__icons">
      <img src="./assets/charts.svg" alt="chartbar" />
      <img src="./assets/wifi.svg" alt="wifi" />
      <img src="./assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <button>
        <span>역삼1동</span>
        <img src="./assets/arrowdown.svg" alt="arrowdown" />
      </button>
    </div>
    <div class="menu-bar__icons">
      <button><img src="./assets/search.svg" alt="search" /></button>
      <button><img src="./assets/menu.svg" alt="menu" /></button>
      <button><img src="./assets/alram.svg" alt="alram" /></button>
    </div>
  </div>
</header>

<style>
  header {
    padding: 15px 20px;
    border-bottom: 1px solid rgb(237, 237, 239);
  }

  header .info-bar,
  header .menu-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header .info-bar .info-bar__icons {
    display: flex;
    align-items: center;
  }

  header .info-bar .info-bar__icons img {
    width: 20px;
    margin-right: 8px;
  }

  header .info-bar .info-bar__icons img:last-child {
    margin-right: 0;
  }

  header .menu-bar {
    padding: 15px 0;
  }

  header .menu-bar .menu-bar__location button {
    background-color: transparent;
    border: none;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  header .menu-bar .menu-bar__location button span {
    font-size: 20px;
    font-weight: bold;
  }

  header .menu-bar .menu-bar__location button img {
    width: 15px;
  }

  header .menu-bar .menu-bar__icons {
    display: flex;
    align-items: center;
  }

  header .menu-bar .menu-bar__icons button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  header .menu-bar .menu-bar__icons button img {
    width: 25px;
  }
</style>
