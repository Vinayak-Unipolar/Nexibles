import React from 'react';
import { Circle, Rectangle, Triangle } from 'react-shapes';

const Editshapes = () => {
    return (
        <div className="">
            <div className="w-[300px] h-[500px] overflow-y-auto bg-white p-6">
                <h3 className="text-black text-2xl font-semibold">Shapes</h3>
                <div className="flex justify-around mt-4">
                    <Rectangle width={100} height={100} fill={{ color: 'blue' }} />
                    <Circle diameter={100} fill={{ color: 'red' }} />
                    <Triangle width={100} height={100} fill={{ color: 'green' }} />
                </div>
                <br />
                <hr />
            </div>
        </div>
    );
};

export default Editshapes;
