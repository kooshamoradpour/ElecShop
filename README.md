# ElecShop
![License](https://img.shields.io/badge/license-MIT-blue)

## Description
<span style="color: yellow;">**ELECSHOP**</span>  is your go-to online store for the latest electronics, offering top-quality products at great prices with fast, reliable shipping.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Usage](#usage)
- [Features](#features)
- [Mock-Up](#mock-up)
- [Deployed URL](#deployed-url)
- [Technology Stack](#technology-stack)
- [Tools Used](#tools-used)
- [License](#license)
- [Contributing](#contributing)
- [The Software Developers](#the-software-developers)

## Installation

### Prerequisites
- Install **Node.js** (LTS version recommended)
- Install **MongoDB** (for local development)
- Configure **.env** file with required variables

### Steps to Run
```
# Clone the repository
git clone https://github.com/kooshamoradpour/ElecShop.git
cd ElecShop

# Install dependencies
npm install

# Start the development server
npm run dev
```

For production:
```
npm run build
npm start
```

## Configuration
Ensure the following environment variables are set in your **.env** file:
```
# Example .env file
MONGODB_URI=your_MONGODB_URI_here
JWT_SECRET_KEY=your_JWT_key_here
```

## Testing
To run test:
```
npm run test
```

## Deployment
To deploy on **Render**:
```
git push origin main
```
The deployment pipeline will automatically trigger on the latest commit.

## Usage
Once you open the website, you will find a list of electronic products on our home page. In order to add add the products that you like in your cart, you will need first to create an account, by clicking on <span style="color: yellow;">**NEW CUSTOMER?**</span>, add your username, email and password, or login if you already have an account. Then, add your product to your cart. Click on the cart icon to view your cart page, where you can change the quantity, remove an item and proceed to checkout. We have also a contact page, where you can send any concerns to the store and contact the web developers. Once you don't, click on log out to exit the app.

## Features
- ✅ **Browse & Discover Products:** Users can browse through a wide catalog of electronics.
- ✅ **Add to Cart:** Users can easily add products to their shopping cart for later purchase.
- ✅ **Notifications:** Users receive updates on their orders.
- ✅ **Checkout Simulation:** Users can check out and proceed with simulated payments.
- ✅ **Order Confirmation:** After purchasing, users receive an order confirmation with delivery details.
- ✅ **Responsive UI:** The website or app is optimized for both desktop and mobile use.

## Mock-Up

The following images show <span style="color: yellow;">**ElecShop UI**</span>.

![alt text](<Home Page.png>) 

![alt text](<Shopping NEW Customer.png>)

![alt text](<Shopping SIGN IN.png>) 

![alt text](<Cart Page.png>) 

![alt text](<PROCEED To Cart.png>) 

![alt text](<Contact Us.png>)

## Deployed URL

[Click Here](https://elecshop.onrender.com/) to view our app, ElecShop. 

## Technology Stack

* **Front-end:** React, TypeScript, CSS, Bootstrap

* **Back-end:** Node, GraphQL

* **Database:** MongoDB

* **Authentication:** JSON Web Tokens

* **Test:** Github, Cypress

* **Hosting & Deployment:** Render

## Tools Used

* **Coding Environment:** VS Code

* **Monitoring:** Google Chrome DevTools

* **Logo:** Adobe Photoshop

* **Wireframes:** Excalidraw, Figma

* **Presentation & Documentation:** Google Slides

## License

This project is licensed under the MIT license.

## Contributing
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Make your changes and commit (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## The Software Developers
Below are the software developers who built this app, for questions, please contact us:

Stanley Bertrand [GitHub](https://github.com/bertrandstanley)

Adarsh Sidhu [GitHub](https://github.com/sidhuad)

Aley Wigwe [GitHub](https://github.com/aleyw2244)

Koosha Moradpour [GitHub](https://github.com/kooshamoradpour)

Philip Ecdao [GitHub](https://github.com/pecdao)
