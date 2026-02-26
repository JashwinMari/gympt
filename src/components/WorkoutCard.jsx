import React from 'react'

const WorkoutCard = ({category : {name, imageUrl}}) => {
    return (
        <div className=" bg-light/20 w-52 sm:w-64 h-auto rounded-xl flex flex-col justify-center items-center gap-3 p-4">
            <img className="rounded-lg w-44 h-auto sm:w-60" src={imageUrl || '/gympt_logo.png'} alt={name} />
            <h3 className="text-center mt-2">{name}</h3>
        </div>
    )
}

export default WorkoutCard;