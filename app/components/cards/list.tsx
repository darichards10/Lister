import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Card = ({ listName, author, createdDate }) => {
    const formattedListName = encodeURIComponent(listName);

    return (
        <Link href={`/list/view/${formattedListName}`}>
            <div className="max-w-sm rounded-lg overflow-hidden m-4 p-6 bg-dark">
                <div className="font-bold text-xl mb-2">{listName}</div>
                {/* <p className="text-gray-700 text-base">
                    Author: {author}
                </p> */}
                <p className="text-gray-500 text-sm">
                    Created on: {new Date(createdDate).toLocaleDateString()}
                </p>
            </div>
        </Link>
    );
}

Card.propTypes = {
    listName: PropTypes.string.isRequired,
    author: PropTypes.string,
    createdDate: PropTypes.string.isRequired,
};

export default Card;
