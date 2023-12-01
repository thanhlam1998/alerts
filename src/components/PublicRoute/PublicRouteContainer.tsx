import React, { memo } from 'react';

const PublicRouteContainer = ({component: Component, pageInfo={}, role, ...rest}: any) => {
    return <Component pageInfo={pageInfo} {...rest} />;
};

export default memo(PublicRouteContainer);
