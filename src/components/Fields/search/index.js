import React from 'react';

const Search = ({
	value,
	placeholder,
	onChangeHandler,
	onClearHandler,
}) => {
    return (
        <div className='search-component'>
            <input
				id="search"
				type="text"
				className="search-component__input"
				placeholder={placeholder}
				value={value}
				onChange={onChangeHandler}
			/>
        </div>
    );
};

export default Search;