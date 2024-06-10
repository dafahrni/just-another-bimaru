export class MenuView {
    constructor(music) {
        const menu = document.getElementById("menu");
        if (!menu)
            throw new Error("Menu node is missing in HTML.");
        this.menu = menu;
        this.notifyRestartGame = null;
        this.notifyEditGame = null;
        this.editMode = false;
        this.music = music;
        this.musicPlaying = false;
        this.setupHtml();
        this.init();
    }
    init() {
        this.addEventListeners();
    }
    setupHtml() {
        this.menu.innerHTML = `
      <ul>
        <li>Restart Game</li>
        <li>Edit Configurations</li>
        <li class="disabled">Sound off</li>
        <li>Music on</li>
        <li class="disabled">Further Options</li>
      </ul>
    `;
    }
    bindRestartGameClick(handler) {
        this.notifyRestartGame = handler;
    }
    bindEditGameClick(handler) {
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
    handleMenuItemClick(index) {
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
                }
                else {
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
            ? "Save Configuration"
            : "Edit Configuration";
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
//# sourceMappingURL=menu-view.js.map