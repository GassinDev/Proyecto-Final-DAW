<?php

namespace App\Controller\Apis;

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
    public function addToCart(Request $request, Security $security, CarritoRepository $carritoRepository, ClienteRepository $clienteRepository, MerchandisingRepository $merchandisingRepository, ProductoRepository $productoRepository): Response
    {
        // DECODIFICAR LOS DATOS JSON RECIBIDOS EN LA SOLICITUD
        $data = json_decode($request->getContent(), true);

        // OBTENER EL CLIENTE AUTENTICADO Y LUEGO SEGUIDO SU ID
        $cliente = $security->getUser();

        //COMPROBAMOS QUE $CLIENTE ES UNA INSTANCIA DE CLIENTE - ARREGLO DE ERROR
        if ($cliente instanceof Cliente) {
            $clienteId = $cliente->getId();
        }

        // OBTENEMOS LOS IDS DEL ARRAY DE DATOS
        if ((isset($data['merchanId']) && $data['merchanId'] !== null)) {

            $articuloId = $data['merchanId'];
            $size = $data['size'];

            // BUSCAMOS LAS ENTIDADES EN LA BASE DE DATOS
            $merchan = $merchandisingRepository->find($articuloId);
        } else {
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

        if (isset($merchan) && $merchan !== null) {
            $carrito->setMerchandising($merchan);
            $carrito->setSize($size);
        } else {
            $carrito->setProducto($producto);
        }

        // GUARDAR EL PRODUCTO EN EL CARRITO DE LA BASE DE DATOS
        $carritoRepository->save($carrito);

        return new Response();
    }

    #[Route('/api/cart/show', name: 'show_carrito', methods: ['GET'])]
    public function showCart(CarritoRepository $carritoRepository, Security $security, ProductoRepository $productoRepository, MerchandisingRepository $merchandisingRepository): Response
    {
        $cliente = $security->getUser();
        $articulos = $carritoRepository->findBy(['cliente' => $cliente]);

        //ARRAY PARA SEPARAR LOS DOS TIPOS DE ARTICULOS PARA BUSCARLOS EN SUS TABLAS
        $productos = [];
        $merchandising = [];

        foreach ($articulos as $articulo) {

            $producto = $articulo->getProducto();
            $merchan = $articulo->getMerchandising();

            // VERIFICAMOS SI ES PRODUCTO
            if ($producto !== null) {
               //OBTENERMOS LOS DETALLES COMPLETOS DE EL ARTICULO DESDE LA RELACION EN LA TABLA CARRITO
                $productoCompleto = [
                    'id' => $producto->getId(),
                    'name' => $producto->getName(),
                    'image' => $producto->getImage(),
                    'price' => $producto->getPrice(),
                    'quantity' => $articulo->getQuantity() 
                ];

                $productos[] = $productoCompleto;
            }

            // Verificar si el artículo es un merchandising
            if ($merchan !== null) {
                // Obtener los detalles completos del merchandising desde la relación en la entidad Carrito
                $merchanCompleto = [
                    'id' => $merchan->getId(),
                    'name' => $merchan->getName(),
                    'image' => $merchan->getImage(),
                    'price' => $merchan->getPrice(),
                    'size' => $articulo->getSize(), // Talla en el carrito
                    'quantity' => $articulo->getQuantity() // Cantidad en el carrito
                ];

                $merchandising[] = $merchanCompleto;
            }
        }

        return $this->json([
            'productos' => $productos,
            'merchandising' => $merchandising,
        ]);
    }

    #[Route('/api/cart/remove', name: 'remove_to_carrito')]
    public function removeToCart()
    {
    }
}
