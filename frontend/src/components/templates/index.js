import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from "../header"

export const Master = (props) => {
  return (
    <Fragment>
        <Header {...props}/>
        {props.children}
    </Fragment>
    )
}

