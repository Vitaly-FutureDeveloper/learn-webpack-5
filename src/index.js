import * as $ from 'jquery';
import Post from '@models/Post.js';
import './babel.js';
import json from './assets/json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import './styles/styles.css';
import './styles/less.scss';
import WebpackLogo from './assets/Frame72.png';

const post = new Post('Webpack cource', WebpackLogo);

$('pre').addClass('code').html(post.toString());

console.log('Post to string: ' + post.toString());

console.log('JSON: ', json);
console.log('XML: ', xml);
console.log('CSV: ', csv);
