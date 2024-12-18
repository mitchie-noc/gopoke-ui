import React from "react";

export default function ViewSelector({ views, onViewSelect }) {
  const buttonStyle = "p-2 border border-solid flex-1 text-center";

  const viewButtons = views.map((view) => {
    const bgStyle = view.active ? " bg-sky-700 " : " bg-slate-900 ";
    const fontStyle = view.active ? " font-bold" : "";
    return (
      <div
        className={buttonStyle + bgStyle + fontStyle}
        key={view.name}
        onClick={onViewSelect}
      >
        {view.name}
      </div>
    );
  });

  return (
    <div className="flex flex-row items-center justify-center px-2 h-10">
      {viewButtons}
    </div>
  );
}
