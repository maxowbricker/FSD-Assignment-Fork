import React from 'react';
import carrotImage from "../images/carrots.png";
import radishImage from "../images/radish.png";
import cucumberImage from "../images/cucumbers.png";
import beetrootImage from "../images/beetroot.png";
import turnipsImage from "../images/turnips.png";
import beansImage from "../images/beans.png";
import spinachImage from "../images/spinach.png";
import rocketImage from "../images/rocket.png";
import bokChoyImage from "../images/bok-choy.png";
import lettuceImage from "../images/lettuce.png";
import zucchiniImage from "../images/zucchini.png";
import broccoliImage from "../images/brocoli.png";
import snowPeasImage from "../images/snow-peas.png";
import greenOnionsImage from "../images/green-onions.png";
import kaleImage from "../images/kale.png";
import bananasImage from "../images/bananas.png";
import applesImage from "../images/apples.png";
import tomatoesImage from "../images/tomatoes.png";

const SpecialItem = ({ name, originalPrice, newPrice }) => {
    let image;
    // Stores which images are for what Product Name
    switch (name) {
        case 'Carrots': image = carrotImage; break;
        case 'Radish': image = radishImage; break;
        case 'Cucumbers': image = cucumberImage; break;
        case 'Beetroot': image = beetrootImage; break;
        case 'Turnips': image = turnipsImage; break;
        case 'Beans': image = beansImage; break;
        case 'Spinach': image = spinachImage; break;
        case 'Rocket': image = rocketImage; break;
        case 'Bok Choy': image = bokChoyImage; break;
        case 'Lettuce': image = lettuceImage; break;
        case 'Zucchini': image = zucchiniImage; break;
        case 'Broccoli': image = broccoliImage; break;
        case 'Snow Peas': image = snowPeasImage; break;
        case 'Green Onions': image = greenOnionsImage; break;
        case 'Kale': image = kaleImage; break;
        case 'Tomatoes': image = tomatoesImage; break;
        case 'Apples': image = applesImage; break;
        case 'Bananas': image = bananasImage; break;
        default: image = null;
    }

    return (
        <div className="product">
            {image && <img src={image} alt={name} />}
            <p>{name}</p>
            <p className='Orig-Price'>Original Price: ${originalPrice.toFixed(2)}</p>
            <p className='New-Price'>New Price: ${newPrice.toFixed(2)}</p>
        </div>
    );
};

export default SpecialItem;