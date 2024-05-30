export class MenuView {
  private menu: HTMLElement;
  private notifyRestartGame: any;
  private notifyEditGame: any;
  private editMode: boolean;
  private music: HTMLAudioElement;
  private musicPlaying: boolean;
  
  constructor(music: HTMLAudioElement) {
    const menu = document.getElementById("menu");
    if (menu == null) {
      throw new Error("The element 'menu' could not be found.");
    }

    this.menu = menu;
    this.notifyRestartGame = null;
    this.notifyEditGame = null;
    this.editMode = false;
    this.music = music;
    this.musicPlaying = false;

    this.init();
  }

  init() {
    this.addEventListeners();
  }

  bindRestartGameClick(handler: any) {
    this.notifyRestartGame = handler;
  }

  bindEditGameClick(handler: any) {
    this.notifyEditGame = handler;
  }

  addEventListeners() {
    const menuItems = this.menu.querySelectorAll("li");
    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener("click", () => {
        this.handleMenuItemClick(index);
      });
    });
  }

  handleMenuItemClick(index: number) {
    const menuItems = this.menu.querySelectorAll("li");
    if (menuItems[index].classList.contains("disabled")) {
      return;
    }

    switch (index) {
      case 0:
        this.restartGame();
        break;
      case 1:
        this.editGame();
        break;
      case 2:
        alert("Sound off clicked!");
        break;
      case 3:
        if (this.musicPlaying) {
          this.stopMusic();
          menuItems[3].innerText = "Music on";
        } else {
          this.startMusic();
          menuItems[3].innerText = "Music off";
        }
        break;
      case 4:
        alert("Further Options clicked!");
        break;
      default:
        break;
    }
  }

  restartGame() {
    if (this.notifyRestartGame) {
      this.notifyRestartGame();
    }
  }

  editGame() {
    if (this.notifyEditGame) {
      this.notifyEditGame(this.editMode);
    }
  }

  changeEditMode() {
    this.editMode = !this.editMode;

    const menuItems = this.menu.querySelectorAll("li");
    menuItems[1].innerText = this.editMode
        ? "Save Game"
        : "Edit Game";
  }

  startMusic() {
    this.music.loop = true;
    this.music.volume = 0.5;
    this.music.play();
    this.musicPlaying = true;
  }

  stopMusic() {
    if (this.music) {
      this.music.pause();
      this.musicPlaying = false;
    }
  }
}
