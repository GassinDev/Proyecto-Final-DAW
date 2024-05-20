<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiProductosController extends AbstractController
{
    #[Route('/api/productos', name: 'app_api_productos')]
    public function index(): Response
    {
        return $this->render('api_productos/index.html.twig', [
            'controller_name' => 'ApiProductosController',
        ]);
    }
}
