import React from 'react';
import PropTypes from 'prop-types';

const NavList = ({
  className,
  onHoverList,
  onLeaveList,
  selectedListTitle,
  movieRef,
  movieDesc,
  onSelectList,
  hoveredClassName,
}) => {
  return [
    <li
      key={movieRef}
      className={className}
      onMouseEnter={() => onHoverList(movieRef)}
      onMouseLeave={onLeaveList}
      onClick={() => onSelectList(movieRef)}
    >
      {selectedListTitle}
    </li>,
    <p className={hoveredClassName}>{movieDesc}</p>,
  ];
};

NavList.propTypes = {
  className: PropTypes.string,
  onHoverList: PropTypes.func.isRequired,
  onLeaveList: PropTypes.func.isRequired,
  selectedListTitle: PropTypes.string.isRequired,
  movieRef: PropTypes.string.isRequired,
  movieDesc: PropTypes.string,
  onSelectList: PropTypes.func.isRequired,
  hoveredClassName: PropTypes.string,
};

export default NavList;
