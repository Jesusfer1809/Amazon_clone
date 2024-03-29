import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AiOutlineSearch } from 'react-icons/ai'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { BiUserCircle } from 'react-icons/bi'

import { signIn, signOut, useSession } from 'next-auth/react'
import { listTopics } from 'utils/listTopics'
import BasketContext from 'context/Tasks/BasketContext'

function Header(): JSX.Element {
  const { data: session } = useSession()
  const { products } = useContext(BasketContext)

  return (
    <div className=' bg-amazon_blue text-white flex flex-col  text-xs space-y-2'>
      <div className='flex justify-between md:justify-start items-center space-x-4 lg:space-x-8  pb-1 pt-4 px-3 lg:px-4'>
        <Link href='/'>
          <div className='relative flex items-center h-[30px] w-[130px] md:h-[40px] md:w-[150px] 2xl:h-[50px] 2xl:w-[170px] cursor-pointer'>
            <Image
              src='https://links.papareact.com/f90'
              layout='fill'
              objectFit='contain'
              alt='logo'
            />
          </div>
        </Link>

        <div className=' hidden md:flex bg-yellow-400 h-10 flex-grow rounded-md hover:bg-yellow-500 '>
          <input
            type='text '
            className='h-full  w-full rounded-l-md focus:outline-none text-amazon_blue px-4 text-base '
          />

          <AiOutlineSearch className='w-12 2xl:w-14 h-full text-amazon_blue px-3 cursor-pointer' />
        </div>

        <div className='flex space-x-4 sz500:space-x-8 md:space-x-4 h-full'>
          <div
            className='flex sm:hidden items-center 2xl:text-base '
            onClick={async () => {
              session === null ? await signIn() : await signOut()
            }}
          >
            <span className='text-sm font-semibold'>
              {session !== null
                ? `${session?.user?.name as string}`
                : 'Identifícate'}
            </span>
            <BiUserCircle className='w-7 h-7 sm:w-8 sm:h-8' />
          </div>

          <div
            className='hidden sm:flex flex-col justify-center cursor-pointer '
            onClick={async () => {
              session === null ? await signIn() : await signOut()
            }}
          >
            <span className='2xl:text-lg'>
              {session !== null
                ? `Hola, ${session?.user?.name as string}`
                : 'Sign In'}
            </span>
            <span className='text-sm font-semibold 2xl:text-base'>
              Cuenta y Listas
            </span>
          </div>

          <Link href='/orders'>
            <div className='hidden sm:flex flex-col justify-center cursor-pointer '>
              <span className='2xl:text-lg'>Devoluciones</span>
              <span className='text-sm font-semibold 2xl:text-base'>
                y Pedidos
              </span>
            </div>
          </Link>

          <Link href='/checkout'>
            <div className='flex items-center cursor-pointer relative'>
              <div className='absolute w-5 h-5 2xl:w-6 2xl:h-6 text-xs 2xl:text-base top-1 left-4 bg-yellow-500 text-amazon_blue rounded-full flex justify-center items-center'>
                {products.length}
              </div>
              <HiOutlineShoppingCart className=' w-7 h-7 sm:w-8 sm:h-8 2xl:w-10 2xl:h-10 ' />
              <span className='text-sm font-semibold hidden sz400:inline 2xl:text-lg'>
                Carrito
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className=' p-1 px-3 flex md:hidden'>
        <div className=' flex w-full bg-yellow-400 h-10  rounded-md hover:bg-yellow-500'>
          <input
            type='text '
            placeholder='...Buscar en Amazon'
            className='h-full  w-full rounded-l-md focus:outline-none text-amazon_blue placeholder-amazon_blue-light px-4 text-base '
          />

          <AiOutlineSearch className='w-12 h-full text-amazon_blue px-3 cursor-pointer' />
        </div>
      </div>

      <div className=' bg-gradient-to-b from-amazon_blue to-amazon_blue-light md:from-amazon_blue-light  '>
        <ul className='flex text-sm font-semibold overflow-x-scroll scrollbar-hide space-x-2 md:space-x-1 '>
          {listTopics.mobile.map((topic) => (
            <li
              key={topic}
              className='p-3 text-base inline-block md:hidden whitespace-nowrap'
            >
              <a href='#'>{topic}</a>
            </li>
          ))}

          {listTopics.landscape.map((topic) => (
            <li
              key={topic}
              className='p-3 hidden md:inline-block whitespace-nowrap 2xl:text-lg'
            >
              <a href='#'>{topic}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
