# Camera shop 

### About project

"Camera shop" is a website for the sale of photo and video equipment.

The app allows to:

- **sort** products by price or popularity;
- **filter** products by price, category, type or level;
- **paginate** between pages;
- **search** products by name;
- **add** products in the basket;
- **allow** promocodes on the basket page (camera-333, camera-444, camera-555);
- **calculate** total cost, or cost with discount;
- **make an order** from the basket page;

[Check the Demo](https://external.ink?to=/1-axr-camera-shop-lopukhin.vercel.app/)

<img src="https://github.com/BentonFraizer/camera-shop/blob/master/.github/workflows/camera-shop.png" width="769" />

### Stack 
- React (TypeScript)
- React Router v.6
- Redux
- Webpack

### ⚙️ How To Run Locally

1. clone repo with:
```
git clone git@github.com:BentonFraizer/camera-shop.git
```
2. go into the project folder with:
```
cd camera-shop/project/
```
3. install all dependencies with:
```
npm install
```
4. run in the **dev** mode with:
```
npm start
```

**Warning**
To correctly work with project need to add one option to the package.json:
```
"parserOptions": {
  "tsconfigRootDir": "./project/",
  //other options
},
```
and delete with option before deploying.
