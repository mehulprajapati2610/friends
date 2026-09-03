import React, { useState } from 'react';
import { CompleteSceneQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface CompleteSceneProps {
  question: CompleteSceneQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
}

export const CompleteScene: React.FC<CompleteSceneProps> = ({
  question,
  onAnswer,
}) => {
  // Map of placed item target IDs: { 'zone-red': 'item-red' }
  const [placedItems, setPlacedItems] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleItemSelect = (itemId: string) => {
    sound.playClick();
    setSelectedItem((prev) => (prev === itemId ? null : itemId));
  };

  const handleZoneSelect = (zoneId: string) => {
    if (!selectedItem) return;

    // Check if selected item matches this dropzone
    const itemDef = question.items.find((i) => i.id === selectedItem);
    if (itemDef && itemDef.targetId === zoneId) {
      // Correct placement!
      sound.playCorrect();
      const updated = { ...placedItems, [zoneId]: selectedItem };
      setPlacedItems(updated);
      setSelectedItem(null);

      // Check if all items placed
      if (Object.keys(updated).length === question.items.length) {
        setCompleted(true);
        sound.playThemeClaps();
        setTimeout(() => {
          onAnswer(
            'All items placed correctly',
            true,
            question.feedbackBadge || 'Scene Completed!'
          );
        }, 1000);
      }
    } else {
      // Incorrect placement
      sound.playWrong();
      setSelectedItem(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden">
      {/* Title & Instructions */}
      <div className="text-center my-1">
        <h2 className="font-headline-lg text-lg sm:text-xl text-primary font-bold">
          COMPLETE THE SCENE
        </h2>
        <p className="font-body-md text-xs text-on-surface-variant line-clamp-2">
          {question.prompt}
        </p>
      </div>

      {/* The Scene Canvas with Dropzones */}
      <div className="w-full h-64 bg-[#eef8ff] border-4 border-tertiary-container rounded-2xl relative overflow-hidden tactile-shadow">
        <img
          src={question.sceneImage}
          alt="Scene"
          className="w-full h-full object-cover opacity-85 mix-blend-multiply"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Dropzones */}
        {question.dropzones.map((zone) => {
          const isPlaced = !!placedItems[zone.id];
          const placedItem = isPlaced ? question.items.find((item) => item.id === placedItems[zone.id]) : null;

          return (
            <button
              key={zone.id}
              onClick={() => handleZoneSelect(zone.id)}
              style={{
                top: `${zone.topPercent}%`,
                left: `${zone.leftPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all ${
                isPlaced
                  ? 'border-secondary-container bg-secondary-container/90 scale-110 shadow-md'
                  : selectedItem
                  ? 'border-dashed border-secondary bg-secondary-container/40 animate-pulse scale-105'
                  : 'border-dashed border-outline-variant bg-surface/50'
              }`}
            >
              {isPlaced ? (
                <span
                  className="material-symbols-outlined text-on-secondary-container text-2xl animate-pop"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {placedItem?.icon || 'umbrella'}
                </span>
              ) : (
                <span className="material-symbols-outlined text-outline-variant text-xl">
                  add
                </span>
              )}
            </button>
          );
        })}

        {/* Completion Celebration Badge */}
        {completed && (
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-xs flex items-center justify-center animate-pop">
            <span className="font-headline-xl text-xl text-secondary-container bg-primary px-4 py-2 rounded-full border-4 border-secondary-container shadow-lg">
              {question.feedbackBadge || 'PERFECT! 👏'}
            </span>
          </div>
        )}
      </div>

      {/* Draggable / Selectable Items Dock */}
      <div className="w-full bg-surface-container-highest border-4 border-primary rounded-xl p-2.5 flex justify-around items-center my-2 shadow-[4px_4px_0px_0px_rgba(89,59,138,1)]">
        {question.items.map((item) => {
          const isPlaced = Object.values(placedItems).includes(item.id);
          const isSelected = selectedItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => !isPlaced && handleItemSelect(item.id)}
              disabled={isPlaced}
              className={`flex flex-col items-center p-2 rounded-xl border-4 transition-all ${
                isPlaced
                  ? 'opacity-30 border-transparent cursor-not-allowed scale-90'
                  : isSelected
                  ? 'bg-secondary-container border-secondary scale-110 shadow-md animate-bounce'
                  : 'bg-surface border-outline tactile-shadow hover:border-primary btn-press'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: item.color || '#593b8a' }}
              >
                <span className="material-symbols-outlined text-white text-xl">
                  {item.icon || 'umbrella'}
                </span>
              </div>
              <span className="font-label-bold text-xs text-on-surface mt-1 truncate max-w-[80px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
