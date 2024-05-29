<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\ResponseEvent;

class CorsResponseListener
{
    public function onKernelResponse(ResponseEvent $event)
    {
        $response = $event->getResponse();

        // PARA CONFIGURAR LOS ENCABEZADOS CORS
        $response->headers->set('Access-Control-Allow-Origin', '*');
        
    }
}