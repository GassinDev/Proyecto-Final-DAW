import React from 'react';
import '../styles/bannervideo.css';

const BannerVideo = () => {
    return (
        <div className="video-banner">
            <video autoPlay loop muted className="banner-video">
                <source src='/videos/bannervideo.mp4' type="video/mp4" />
            </video>
        </div>
    );
};

export default BannerVideo;