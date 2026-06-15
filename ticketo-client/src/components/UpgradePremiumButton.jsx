"use client";

import { Button } from "@heroui/react";
import React from "react";

const UpgradePremiumButton = () => {
  const updateTopPremium = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    const data = await res.json();
    console.log(data);
    if(data?.url){
        window.location.href = data.url
    }
  };
  return (
    <div>
      <Button
        onClick={updateTopPremium}
        className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold h-11 px-6 shadow-lg shadow-yellow-500/10 shrink-0"
        radius="lg"
      >
        Upgrade to Premium
      </Button>
    </div>
  );
};

export default UpgradePremiumButton;
