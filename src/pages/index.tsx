import type { ShoppingItem } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { ItemModal } from "../components/ItemModal";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data: itemsData, isLoading } = trpc.item.getAllItems.useQuery(
    undefined,
    {
      onSuccess: (itemsData) => {
        setItems(itemsData);
      },
    }
  );
  const hello = trpc.example.hello.useQuery({ text: "from Chloe Gan" });

  if (!itemsData || isLoading) {
    return <div className="">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {modalOpen && (
        <ItemModal setModalOpen={setModalOpen} setItems={setItems} />
      )}
      <main className="mx-auto my-12 max-w-3xl">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">My Shopping List</h2>
          <button
            type="button"
            onClick={() => setModalOpen((modalOpenState) => !modalOpenState)}
            className="button rounded-lg bg-violet-700 px-3 py-2 font-bold text-zinc-50 transition hover:bg-violet-500"
          >
            Add shopping item
          </button>
        </div>
        {hello.data?.greeting}
        <div className="mt-4 flex w-full flex-col gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className=" flex items-center justify-between rounded-lg border-2 border-violet-600 p-4 transition hover:bg-violet-600 hover:text-white"
            >
              <span className="text-xl font-semibold">{item.name}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
