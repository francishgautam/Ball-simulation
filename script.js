class MovingCircle {
  constructor(posX, posY, velX, velY, diameter, height = diameter, color = '#000') {
    this.posX = posX;
    this.posY = posY;
    this.diameter = diameter;
    this.height = height;
    this.color = color;
    this.velX = velX;
    this.velY = velY;
    this.speedFactor = 5;

    this.element = document.createElement('div');

    this.element.style.width = `${this.diameter}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.posY}px`;
    this.element.style.left = `${this.posX}px`;
    this.element.style.position = 'absolute';
    this.element.style.background = this.color;
    this.element.style.borderRadius = '50%';

    document.body.appendChild(this.element);

    this.moveCircle = this.moveCircle.bind(this);
    this.refreshPosition();
  }

  refreshPosition() {
    this.element.style.top = `${this.posY}px`;
    this.element.style.left = `${this.posX}px`;
  }

  moveCircle(circles) {
    this.posX += this.velX * this.speedFactor;
    this.posY += this.velY * this.speedFactor;

    // Check collision with walls
    if (this.posX <= 0 || this.posX + this.diameter >= window.innerWidth) {
      this.velX *= -1;
    }

    if (this.posY <= 0 || this.posY + this.height >= window.innerHeight) {
      this.velY *= -1;
    }

    // Check collision with other circles
    for (let circle of circles) {
      if (circle !== this && this.isCollidingWith(circle)) {
        this.applyPhysics(circle);
      }
    }

    this.refreshPosition();
    requestAnimationFrame(() => this.moveCircle(circles));
  }

  isCollidingWith(otherCircle) {
    const deltaX = this.posX - otherCircle.posX;
    const deltaY = this.posY - otherCircle.posY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance < (this.diameter / 2 + otherCircle.diameter / 2);
  }

  applyPhysics(otherCircle) {
    let tempVelX = this.velX;
    let tempVelY = this.velY;
    this.velX = otherCircle.velX;
    this.velY = otherCircle.velY;
    otherCircle.velX = tempVelX;
    otherCircle.velY = tempVelY;
  }
}

// Create multiple circles
const circles = [];
for (let i = 0; i < 50; i++) {
  const circle = new MovingCircle(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
    Math.random() * 2 - 1 + 0.1,
    Math.random() * 2 - 1 + 0.1,
    Math.random() * 30
  );
  circles.push(circle);
}

circles.forEach(circle => circle.moveCircle(circles));
