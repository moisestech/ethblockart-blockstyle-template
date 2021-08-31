import React, { useEffect, useMemo, useRef } from 'react';
import { useThree, Canvas } from 'react-three-fiber';
import MersenneTwist from 'mersenne-twister';
import { TorusKnot } from '@react-three/drei';
import Color from 'color';

/*
Create your Custom style to be turned into a EthBlock.art BlockStyle NFT

Basic rules:
 - use a minimum of 1 and a maximum of 4 "modifiers", modifiers are values between 0 and 1,
 - use a minimum of 1 and a maximum of 3 colors, the color "background" will be set at the canvas root
 - Use the block as source of entropy, no Math.random() allowed!
 - You can use a "shuffle bag" using data from the block as seed, a MersenneTwister library is provided

 Arguments:
  - block: the blockData, in this example template you are given 3 different blocks to experiment with variations, check App.js to learn more
  - mod[1-3]: template modifier arguments with arbitrary defaults to get your started
  - color: template color argument with arbitrary default to get you started

Getting started:
 - Write canvas code, consuming the block data and modifier arguments,
   make it cool and use no random() internally, component must be pure, output deterministic
 - Customize the list of arguments as you wish, given the rules listed below
 - Provide a set of initial /default values for the implemented arguments, your preset.
 - Think about easter eggs / rare attributes, display something different every 100 blocks? display something unique with 1% chance?


*/

// Required style metadata
const styleMetadata = {
  name: '',
  description: '',
  image: '',
  creator_name: '',
  options: {
    mod1: 0.4,
    mod2: 0.1,
    mod3: 0.4,
    color1: '#fff000',
    background: '#000000',
  },
};

export { styleMetadata };

function rect(props) {
  const { ctx, x, y, width, height, color } = props;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

const Outer = React.memo(
  ({ canvasRef, block, width, height, mod1, mod2, background, ...props }) => {
    const shuffleBag = useRef();
    const hoistedValue = useRef();

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { hash } = block;
      const seed = parseInt(hash.slice(0, 16), 16);
      shuffleBag.current = new MersenneTwist(seed);

      ctx.clearRect(0, 0, width, height);
      block.transactions.map((tx, i) => {
        const color = Color([ran255(), ran255(), ran255()]).hex();
        rect({
          ctx,
          color,
          x: width * shuffleBag.current.random(),
          y: height * shuffleBag.current.random(),
          width: 100 * mod1,
          height: 50 * mod2,
        });
      });

      function ran255() {
        return Math.floor(255 * shuffleBag.current.random());
      }

      hoistedValue.current = 42;
    }, [canvasRef, block, mod1, mod2]);

    return (
      <canvas
        width={width}
        height={height}
        style={{ width: '100%', height: '100%' }}
        ref={canvasRef}
        {...props}
      />
    );
  }
);

export default Outer;
