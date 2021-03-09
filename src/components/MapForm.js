import React from 'react';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import { Link } from 'react-router-dom';

export default function MapForm(props) {
	return (
		<form onSubmit={props.handleSubmit}>
			<TextInput
				label='Title'
				type='text'
				id='mapFormName'
				name='name'
				value={props.state.name}
				onChange={props.onChange}
			/>
			<TextInput
				label='Image URL'
				type='file'
				id='mapFormImage'
				name='picture'
				onChange={props.onChange}
			/>
			<TextAreaInput
				label='Description'
				type='text'
				id='mapFormDescription'
				name='description'
				onChange={props.onChange}
			/>
			<Link to='/my-list'>
				<button type='submit' className='btn btn-primary'>
					Save
				</button>
			</Link>
		</form>
	);
}