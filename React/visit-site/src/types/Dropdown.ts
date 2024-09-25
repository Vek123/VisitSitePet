interface DropdownInterface {
    element: HTMLElement,
    closing: NodeJS.Timeout | null,
    opening: NodeJS.Timeout | null,
    k: Number,
    openDropdown(): void,
    closeDropdown(): void,
  };

export class Dropdown implements DropdownInterface {
    element: HTMLElement;
    closing: NodeJS.Timeout | null;
    opening: NodeJS.Timeout | null;
    k: Number;
  
    constructor(element: HTMLElement, closing: NodeJS.Timeout | null, opening: NodeJS.Timeout | null, k: Number = 20) {
      this.element = element;
      this.closing = closing;
      this.opening = opening;
      this.k = k;
    }
    openDropdown() {
      let height = this.element.scrollHeight;
      let iter = 0;
      if (this.closing) {
        if (this.element.style.height !== "0") iter = Number(this.element.style.height.slice(0, -2));
        if (this.closing) clearInterval(this.closing);
      }
      this.opening = setInterval(() => {
        if (iter >= height) {
          this.element.style.height = "auto";
          if (this.opening) clearInterval(this.opening);
        } else {
          this.element.style.height = iter + "px";
        }
        iter += 3;
      }, Number(this.k) / (height / 100) + 1);
    }
    closeDropdown() {
      let iter = this.element.scrollHeight;
      if (this.opening) {
        if (this.element.style.height !== "auto") iter = Number(this.element.style.height.slice(0, -2));
        clearInterval(this.opening);
      }
      this.closing = setInterval(() => {
        if (iter <= 0) {
          this.element.style.height = "0px";
          if (this.closing) clearInterval(this.closing);
        } else {
          this.element.style.height = iter + "px";
        }
        iter -= 3;
      }, Number(this.k) / ((this.element ? this.element.scrollHeight : 100) / 100) + 1)
    }
  }