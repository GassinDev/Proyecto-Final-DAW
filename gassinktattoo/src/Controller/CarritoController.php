<?php

namespace App\Controller;

use App\Entity\Carrito;
use App\Entity\Cliente;
use App\Repository\CarritoRepository;
use App\Repository\ClienteRepository;
use App\Repository\MerchandisingRepository;
use App\Repository\ProductoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CarritoController extends AbstractController
{
    //RUTA PARA AÑADIR ARTICULOS AL CARRITO, AJUSTADO PARA QUE FUNCIONE TANTO PARA MERCHANDISING COMO PARA PRODUCTOS - MEDIANTE VALIDACIONES
    #[Route('/api/cart/add', name: 'ad_to_carrito', methods: ['POST'])]
    public function addToCart(Request $request, Security $security, CarritoRepository $carritoRepository, ClienteRepository $clienteRepository, MerchandisingRepository $merchandisingRepository, ProductoRepository $productoRepository) : Response
    {
        // DECODIFICAR LOS DATOS JSON RECIBIDOS EN LA SOLICITUD
        $data = json_decode($request->getContent(), true);

        // OBTENER EL CLIENTE AUTENTICADO Y LUEGO SEGUIDO SU ID
        $cliente = $security->getUser();
        $cliente instanceof Cliente;
        
        //COMPROBAMOS QUE $CLIENTE ES UNA INSTANCIA DE CLIENTE - ARREGLO DE ERROR
        if ($cliente instanceof Cliente) {
            $clienteId = $cliente->getId();
        }

        // OBTENEMOS LOS IDS DEL ARRAY DE DATOS
        if((isset($data['merchanId']) && $data['merchanId'] !== null)){

            $articuloId = $data['merchanId'];
            $size = $data['size'];

            // BUSCAMOS LAS ENTIDADES EN LA BASE DE DATOS
            $merchan = $merchandisingRepository->find($articuloId);

        }else{
            $articuloId = $data['productoId'];

            // BUSCAMOS LAS ENTIDADES EN LA BASE DE DATOS
            $producto = $productoRepository->find($articuloId);
        }
        
        $quantity = $data['quantity'];

        // BUSCAMOS LAS ENTIDADES EN LA BASE DE DATOS
        $clienteEntity = $clienteRepository->find($clienteId);
        
        // CREAR UNA NUEVA INSTANCIA DE CARRITO Y ESTABLECER SUS PROPIEDADES
        $carrito = new Carrito();
        $carrito->setCliente($clienteEntity);
        $carrito->setQuantity($quantity);

        if(isset($merchan) && $merchan !== null){
            $carrito->setMerchandising($merchan);
            $carrito->setSize($size);
        }else{
            $carrito->setProducto($producto);
        }

        // GUARDAR EL PRODUCTO EN EL CARRITO DE LA BASE DE DATOS
        $carritoRepository->save($carrito);

        return new Response();
    }

    #[Route('/api/cart/remove', name: 'remove_to_carrito')]
    public function removeToCart()
    {
    }
}
