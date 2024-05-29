<?php

namespace App\Controller\Apis;

use App\Repository\ProductoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiProductosController extends AbstractController
{
    #[Route('/api/productos', name: 'api_productos')]
    public function getProductos(ProductoRepository $productoRepository): Response
    {
        $productos = $productoRepository->findAll();
        return $this->json($productos);
    }
}
