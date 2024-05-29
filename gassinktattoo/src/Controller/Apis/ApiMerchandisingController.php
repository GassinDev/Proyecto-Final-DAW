<?php

namespace App\Controller\Apis;

use App\Repository\MerchandisingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiMerchandisingController extends AbstractController
{
    #[Route('/api/merchandising', name: 'api_merchandising')]
    public function getMerchandising(MerchandisingRepository $merchandisingRepository): Response
    {
        $merchandising = $merchandisingRepository->findAll();
        
        return $this->json($merchandising);
    }
}
