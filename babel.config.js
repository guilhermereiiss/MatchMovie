// import pkg from '@babel/core';
// const { createTransformer } = pkg;


// export default {
//   presets: [
//     '@babel/preset-env',
//     '@babel/preset-react'
//   ],
//   plugins: [
//     '@babel/plugin-proposal-class-properties',
//     '@babel/plugin-transform-runtime'
//   ]
// };

export default {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', 
  ],
};
