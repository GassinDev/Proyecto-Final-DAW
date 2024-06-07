<?php

namespace App\Controller;

use App\Repository\ClienteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class WorkerController extends AbstractController
{
    #[Route(path: '/workers', name: 'workers')]
    public function workers(ClienteRepository $clienteRepository): Response
    {

        // Obtener todos los clientes
        $clientes = $clienteRepository->findAll();

        // Filtrar los clientes que tienen el rol ROLE_WORKER
        $workers = array_filter($clientes, function ($cliente) {
            return in_array('ROLE_WORKER', $cliente->getRoles());
        });

        // Convierte el array de objetos a un formato JSON
        $response = [];
        foreach ($workers as $worker) {
            $response[] = [
                'id' => $worker->getId(),
                'username' => $worker->getUsername(),
            ];
        }

        // Retorna la lista de workers como un JSON
        return new JsonResponse($response);
    }

    #[Route(path: '/workers/clienteUsernames', name: 'clienteUsernames')]
    public function getClienteUsernames(ClienteRepository $clienteRepository): JsonResponse
    {
        $clientes = $clienteRepository->findAll();

        $usernames = [];
        foreach ($clientes as $cliente) {
            if (!in_array('ROLE_WORKER', $cliente->getRoles()) && !in_array('ROLE_ADMIN', $cliente->getRoles())) {
                $usernames[] = $cliente->getUsername();
            }
        }


        return new JsonResponse(['usernames' => $usernames]);
    }
}
