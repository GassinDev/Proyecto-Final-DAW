import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarrouselPromos = () => {
    const defaultImages = [
        'https://via.placeholder.com/400x200?text=Primer+T%C3%ADtulo',
        'https://via.placeholder.com/400x200?text=Segundo+T%C3%ADtulo',
        'https://via.placeholder.com/400x200?text=Tercer+T%C3%ADtulo',
    ];

    return (
        <div className="container text-center mt-5">
            <div className="d-flex justify-content-center">
                <div className="carousel-column">
                    <Carousel controls={false}>
                        {defaultImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="carousel-column">
                    <Carousel controls={false}>
                        {defaultImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="carousel-column">
                    <Carousel controls={false}>
                        {defaultImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default CarrouselPromos;