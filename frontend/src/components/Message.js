import React from 'react'
import { Children } from 'react'
import {Alert} from 'react-bootstrap'

export default function Message({variant, Children}) {
    return (
        <div>
            <Alert variant={variant}>
                {Children}
            </Alert>

        </div>
    )
}

Message.defaultProps = {
    variant: 'info'
}
