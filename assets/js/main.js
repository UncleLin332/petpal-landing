/**
 * PetPal Landing Page Interactive Logic - Zen Edition
 * - Calm Tech Real Hardware Interactive Simulator (5-step Sedentary Clear & 15-step Habit Check)
 * - Early Bird Waitlist with Instant Feedback, Confetti & VIP Badge
 * - FAQ Accordions & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initSimulator();
  initWaitlist();
  initFAQ();
  initMobileMenu();
});

/* ==========================================================================
   1. Calm Tech Interactive Simulator (9/4 Real Hardware Breakthrough Demo)
   ========================================================================== */
function initSimulator() {
  const simDevice = document.getElementById('sim-device');
  const simHapticFeedback = document.getElementById('sim-haptic-feedback');
  const simSedentaryCard = document.getElementById('sim-sedentary-card');
  const simWalkingCapsule = document.getElementById('sim-walking-capsule');
  const simWalkHabitCheck = document.getElementById('sim-walk-habit-check');
  const simWalkHabitText = document.getElementById('sim-walk-habit-text');
  const simStreakCount = document.getElementById('sim-streak-count');

  // Habit 3: Read 10 Pages (Linked to Touch)
  const simReadHabitCheck = document.getElementById('sim-read-habit-check');
  const simReadHabitText = document.getElementById('sim-read-habit-text');
  const simReadStreakCount = document.getElementById('sim-read-streak-count');

  const btnStep5 = document.getElementById('btn-sim-step5');
  const btnStep15 = document.getElementById('btn-sim-step15');
  const btnTouch = document.getElementById('btn-sim-touch');
  const btnReset = document.getElementById('btn-sim-reset');

  if (!simDevice) return;

  let steps = 0;
  let sedentaryCleared = false;
  let walkHabitCompleted = false;
  let readHabitCompleted = false;

  function areAllTasksCompleted() {
    // Habit 1 (Drink Water) is completed by default.
    // When both Walk and Read are completed, all tasks are done!
    return walkHabitCompleted && readHabitCompleted;
  }

  function renderMochiFace(forceSmile = false) {
    const eyeL = document.getElementById('sim-eye-l');
    const eyeR = document.getElementById('sim-eye-r');
    const mouth = document.getElementById('sim-mouth');
    if (!eyeL || !eyeR || !mouth) return;

    if (areAllTasksCompleted() || forceSmile) {
      eyeL.textContent = '^';
      eyeR.textContent = '^';
      mouth.textContent = '◡';
    } else {
      eyeL.textContent = '•';
      eyeR.textContent = '•';
      mouth.textContent = '‿';
    }
  }

  function triggerHaptic(type, text) {
    simDevice.classList.remove('buzz-active');
    void simDevice.offsetWidth; // trigger reflow
    simDevice.classList.add('buzz-active');

    if (simHapticFeedback) {
      simHapticFeedback.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-brand-500 animate-ping mr-1.5"></span>${text}`;
      simHapticFeedback.classList.remove('opacity-0');
      setTimeout(() => {
        simHapticFeedback.classList.add('opacity-0');
      }, 2500);
    }
  }

  // 1. Simulate 5 Steps: Clears Sedentary Alert
  if (btnStep5) {
    btnStep5.addEventListener('click', () => {
      steps = 5;
      triggerHaptic('TICK', '⚡️ 掌心微震回饋 (haptic.TICK)');

      if (!sedentaryCleared && simSedentaryCard && simWalkingCapsule) {
        sedentaryCleared = true;
        simSedentaryCard.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
          simSedentaryCard.classList.add('hidden');
          simWalkingCapsule.classList.remove('hidden');
          simWalkingCapsule.classList.remove('opacity-0');
        }, 250);

        // Auto fade walking confirmation capsule after 4 seconds
        setTimeout(() => {
          if (simWalkingCapsule) {
            simWalkingCapsule.classList.add('opacity-0');
            setTimeout(() => simWalkingCapsule.classList.add('hidden'), 500);
          }
        }, 4000);
      }
    });
  }

  // 2. Simulate 15 Steps: Completes Habit 2 (Walk)
  if (btnStep15) {
    btnStep15.addEventListener('click', () => {
      steps = 15;
      triggerHaptic('CONFIRM', '⚡️⚡️ 雙重震動確認 (haptic.CONFIRM)');

      // Ensure sedentary alert is cleared as well
      if (!sedentaryCleared && simSedentaryCard) {
        sedentaryCleared = true;
        simSedentaryCard.classList.add('hidden');
      }

      if (!walkHabitCompleted && simWalkHabitCheck && simWalkHabitText) {
        walkHabitCompleted = true;
        simWalkHabitCheck.className = 'w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center transition-all duration-300 shadow-sm';
        simWalkHabitCheck.innerHTML = `
          <svg class="w-4 h-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        `;
        simWalkHabitText.classList.add('line-through', 'text-stone-400');
        
        if (simStreakCount) {
          simStreakCount.textContent = '4 day streak';
          simStreakCount.classList.add('text-brand-600', 'font-bold');
        }

        // Check if all completed -> lock smile & celebration
        if (areAllTasksCompleted()) {
          renderMochiFace();
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 70,
              spread: 65,
              origin: { x: 0.6, y: 0.6 }
            });
          }
        } else {
          // Mini confetti for single walk habit
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 35,
              spread: 45,
              origin: { x: 0.7, y: 0.6 }
            });
          }
        }
      }
    });
  }

  // 3. Simulate Touch Device: Completes Habit 3 (Read 10 Pages) & Smiles
  if (btnTouch) {
    btnTouch.addEventListener('click', () => {
      triggerHaptic('TOUCH', '🌱 摸一下打卡 · Read 10 Pages 完成！');

      if (!readHabitCompleted && simReadHabitCheck && simReadHabitText) {
        readHabitCompleted = true;
        simReadHabitCheck.className = 'w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center transition-all duration-300 shadow-sm';
        simReadHabitCheck.innerHTML = `
          <svg class="w-4 h-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        `;
        simReadHabitText.classList.add('line-through', 'text-stone-400');

        if (simReadStreakCount) {
          simReadStreakCount.textContent = '1 day streak';
          simReadStreakCount.classList.add('text-brand-600', 'font-bold');
        }
      }

      // Handle Mochi Face expression:
      if (areAllTasksCompleted()) {
        // All tasks completed! Screen maintains permanent happy smile
        renderMochiFace();
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { x: 0.5, y: 0.6 }
          });
        }
      } else {
        // Temporary smile, then return to neutral if not all tasks completed
        renderMochiFace(true);
        setTimeout(() => {
          if (!areAllTasksCompleted()) {
            renderMochiFace(false);
          }
        }, 1800);
      }
    });
  }

  // 4. Reset Simulator
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      steps = 0;
      sedentaryCleared = false;
      walkHabitCompleted = false;
      readHabitCompleted = false;

      // Reset Sedentary Alert Card
      if (simSedentaryCard) {
        simSedentaryCard.classList.remove('hidden', 'opacity-0', 'scale-95');
      }
      if (simWalkingCapsule) {
        simWalkingCapsule.classList.add('hidden', 'opacity-0');
      }

      // Reset Habit 2 (Walk)
      if (simWalkHabitCheck && simWalkHabitText) {
        simWalkHabitCheck.className = 'w-6 h-6 rounded-full border-2 border-stone-200 bg-white flex items-center justify-center transition-all duration-300';
        simWalkHabitCheck.innerHTML = '';
        simWalkHabitText.classList.remove('line-through', 'text-stone-400');
      }
      if (simStreakCount) {
        simStreakCount.textContent = '3 day streak';
        simStreakCount.classList.remove('text-brand-600', 'font-bold');
      }

      // Reset Habit 3 (Read)
      if (simReadHabitCheck && simReadHabitText) {
        simReadHabitCheck.className = 'w-6 h-6 rounded-full border-2 border-stone-200 bg-white flex items-center justify-center transition-all duration-300';
        simReadHabitCheck.innerHTML = '';
        simReadHabitText.classList.remove('line-through', 'text-stone-400');
      }
      if (simReadStreakCount) {
        simReadStreakCount.textContent = '0 day streak';
        simReadStreakCount.classList.remove('text-brand-600', 'font-bold');
      }

      // Reset Mochi Face & Haptic Pill
      renderMochiFace(false);
      if (simHapticFeedback) {
        simHapticFeedback.classList.add('opacity-0');
      }
    });
  }
}

/* ==========================================================================
   2. Early Bird Waitlist Handling & Storage
   ========================================================================== */
function initWaitlist() {
  const form = document.getElementById('waitlist-form');
  const formHero = document.getElementById('waitlist-form-hero');
  const modal = document.getElementById('vip-success-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalVipCode = document.getElementById('modal-vip-code');
  const modalEmailSpan = document.getElementById('modal-user-email');

  function handleWaitlistSubmission(email) {
    if (!email || !email.includes('@')) {
      alert('請輸入正確的電子郵件信箱！');
      return;
    }

    let list = [];
    try {
      list = JSON.parse(localStorage.getItem('petpal_waitlist') || '[]');
    } catch (e) {
      list = [];
    }

    const seed = 42;
    const vipIndex = seed + list.length + 1;
    const paddedNum = String(vipIndex).padStart(4, '0');
    const vipCode = `VIP-PETPAL-${paddedNum}`;

    const record = {
      email: email,
      vipCode: vipCode,
      createdAt: new Date().toISOString()
    };
    list.push(record);
    localStorage.setItem('petpal_waitlist', JSON.stringify(list));

    // Launch Confetti Celebration
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 200);
    }

    // Show VIP Modal
    if (modal && modalVipCode && modalEmailSpan) {
      modalVipCode.textContent = vipCode;
      modalEmailSpan.textContent = email;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('waitlist-email');
      if (input) handleWaitlistSubmission(input.value.trim());
    });
  }

  if (formHero) {
    formHero.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('waitlist-email-hero');
      if (input) handleWaitlistSubmission(input.value.trim());
    });
  }

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  window.exportWaitlistCSV = function() {
    const list = JSON.parse(localStorage.getItem('petpal_waitlist') || '[]');
    if (list.length === 0) {
      console.log('目前尚無已儲存的早鳥名單。');
      return;
    }
    let csvContent = 'data:text/csv;charset=utf-8,Email,VIP_Code,Created_At\n';
    list.forEach(r => {
      csvContent += `"${r.email}","${r.vipCode}","${r.createdAt}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `petpal_waitlist_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`成功匯出 ${list.length} 筆早鳥名單！`);
  };
}

/* ==========================================================================
   3. FAQ Accordion
   ========================================================================== */
function initFAQ() {
  const faqButtons = document.querySelectorAll('.faq-toggle');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/* ==========================================================================
   4. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!menuBtn || !menu) return;

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}
