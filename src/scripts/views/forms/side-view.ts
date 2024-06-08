enum ViewMode {
  LeftSideViewAndContent = "Left SideView and content",
  ContentOnly = "Content only",
  ContentAndRightSideView = "Content and right SideView",
}

export class SideView {
  menu: HTMLElement;
  config: HTMLElement;
  content: HTMLElement;

  viewMode: ViewMode;
  startX: number;
  startY: number;

  constructor() {
    const menu = document.getElementById("menu");
    const config = document.getElementById("config");
    const content = document.getElementById("content");
    if (menu == null || config == null || content == null) {
      throw new Error("The elements 'menu', 'config' or 'content' could not be found.");
    }

    this.menu = menu;
    this.config = config;
    this.content = content;

    this.viewMode = ViewMode.ContentOnly;
    this.startX = 0;
    this.startY = 0;

    this.init();
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    // event-handlers for touch interactions
    document.addEventListener("touchstart", this.handleTouchStart.bind(this));
    document.addEventListener("touchend", this.handleTouchEnd.bind(this));

    // event-handlers for mouse interactions
    document.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
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
        this.moveRight(); // Swipe to the right
      } else {
        this.moveLeft(); // Swipe to the left
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
        this.moveRight(); // Mouse movement to the right
      } else {
        this.moveLeft(); // Mouse movement to the left
      }
    }
  }

  moveRight() {
    switch (this.viewMode) {
      case ViewMode.ContentAndRightSideView:
        this.closeConfig();
        this.viewMode = ViewMode.ContentOnly;
        break;
      case ViewMode.ContentOnly:
        this.openMenu();
        this.viewMode = ViewMode.LeftSideViewAndContent;
        break;  
      case ViewMode.LeftSideViewAndContent:
        // do nothing
        break;
    }
  }

  moveLeft() {
    switch (this.viewMode) {
      case ViewMode.LeftSideViewAndContent:
        this.closeMenu();
        this.viewMode = ViewMode.ContentOnly;
        break;
      case ViewMode.ContentOnly:
        this.openConfig();
        this.viewMode = ViewMode.ContentAndRightSideView;
        break;
      case ViewMode.ContentAndRightSideView:
        // do nothing
        break;
    }
  }

  openMenu() {
    this.menu.style.left = "0"; // slide in the menu
    this.content.classList.add("content-with-menu"); // slide the content
  }

  closeMenu() {
    this.menu.style.left = "-250px"; // slide out the menu
    this.content.classList.remove("content-with-menu"); // slide the content back
  }

  openConfig() {
    this.config.style.right = "0"; // slide in the menu
    this.content.classList.add("content-with-config"); // slide the content
  }

  closeConfig() {
    this.config.style.right = "-350px"; // slide out the menu
    this.content.classList.remove("content-with-config"); // slide the content back
  }
}
