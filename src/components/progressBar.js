import react from 'react'
import { Line } from 'rc-progress'

export const ProgressBar = ({ progress }) => {
    return (
        <div>
            <Line percent={progress}
            strokeWidth="3"
            strokeColor="#BF00FF"
            strokeLinecap="square"
            trailWidth="3"
            trailColor="#f3f3f3" />
        </div>
    )
}