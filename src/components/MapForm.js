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
				id='roomFormName'
				name='name'
				value={props.name}
				onChange={props.onChange}
			/>
			<TextInput
				label='Image URL'
				type='text'
				id='roomFormImage'
				name='imageUrl'
				onChange={props.onChange}
			/>
			<TextAreaInput
				label='Description'
				type='text'
				id='roomFormDescription'
				name='description'
				onChange={props.onChange}
			/>
			<Link to='/'>
				<button type='submit' className='btn btn-primary'>
					Save
				</button>
			</Link>
		</form>
	);
}