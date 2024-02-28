export class MenuView {

  private menu: HTMLElement;
  private content: HTMLElement;
  private isOpen: boolean;
  private startX: number;
  private startY: number;
  private notifyRestartGame: any;
  private music: HTMLAudioElement;
  private musicPlaying: boolean;
  
  constructor(music: HTMLAudioElement) {
    const menu = document.getElementById("menu");
    const content = document.getElementById("content");
    if (menu == null || content == null) {
      throw new Error("The elements 'menu' or 'content' could not be found.");
    }

    this.menu = menu;
    this.content = content;

    this.isOpen = false;
    this.startX = 0;
    this.startY = 0;
    this.notifyRestartGame = null;
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

  addEventListeners() {
    // event-handlers for touch interactions
    document.addEventListener("touchstart", this.handleTouchStart.bind(this));
    document.addEventListener("touchend", this.handleTouchEnd.bind(this));

    // event-handlers for mouse interactions
    document.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    // event-handlers for menu items
    const menuItems = this.menu.querySelectorAll("li");
    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener("click", () => {
        this.handleMenuItemClick(index);
      });
    });
  }

  handleTouchStart(e: any) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }

  handleTouchEnd(e: any) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - this.startX;
    const diffY = endY - this.startY;

    // check if swipe is horizontal and long enough
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
      if (diffX > 0) {
        this.toggleMenu(); // swipe right
      } else {
        this.toggleMenu(); // swipe left
      }
    }
  }

  handleMouseDown(e: any) {
    this.startX = e.clientX;
  }

  handleMouseUp(e: any) {
    const endX = e.clientX;
    const diffX = endX - this.startX;

    // Check if mouse movement is horizontal and long enough
    if (Math.abs(diffX) > 100) {
      if (diffX > 0) {
        this.toggleMenu(); // Mouse movement to the right
      } else {
        this.toggleMenu(); // Mouse movement to the left
      }
    }
  }

  toggleMenu() {
    if (this.isOpen) {
      this.menu.style.left = "-250px"; // slide out the menu
      this.content.classList.remove("content-open"); // slide the content back
    } else {
      this.menu.style.left = "0"; // slide in the menu
      this.content.classList.add("content-open"); // slide the content
    }
    this.isOpen = !this.isOpen;
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
        alert("Edit Game clicked!");
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
