import React, { Component } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Board from './Board';
export default class FullPage extends Component {
	constructor() {
		super();
		this.state = {
			sectionsColor: ['white', 'black'],
		}
	}

	render() {
		return (
			<ReactFullpage
				scrollingSpeed = {1000} /* Options here */
				// autoscrolling= {true}
				navigation={true}
				sectionsColor={this.state.sectionsColor}

				render={({ state, fullpageApi }) => {
				return (
					<ReactFullpage.Wrapper>
					<div className="section">
						<div style={{position: 'relative'}}>
							<div style={{right: '5%', top: '2.5%', position:'absolute', color:'#101011', fontSize:'50px'}}>Push</div>
							<Board action="push" style={{position:'absolute'}}/>
						</div>
					</div>
					<div className="section">
						<div style={{position: 'relative'}}>
							<div style={{right: '5%', top: '2.5%', position:'absolute', color:'#101011', fontSize:'50px'}}>Pull</div>
							<Board action="pull" style={{position:'absolute'}}/>
						</div>
					</div>
					<div className="section">
						<div style={{position: 'relative'}}>
							<div style={{right: '5%', top: '2.5%', position:'absolute', color:'#101011', fontSize:'50px'}}>Flip</div>
							<Board action="flip" style={{position:'absolute'}}/>
						</div>
					</div>
					</ReactFullpage.Wrapper>
				);
				}}
			/>
		)
	}
}