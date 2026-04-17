 const themeToggle = document.querySelector('[data-theme-toggle]');
    const root = document.documentElement;
    const STORAGE_THEME_KEY = 'pet-schedule-theme';
    const STORAGE_APPOINTMENTS_KEY = 'pet-schedule-appointments';

    function safeLocalStorageGet(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }

    function safeLocalStorageSet(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Ignorar se localStorage não estiver disponível.
      }
    }

    let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const persistedTheme = safeLocalStorageGet(STORAGE_THEME_KEY);
    if (persistedTheme === 'dark' || persistedTheme === 'light') {
      currentTheme = persistedTheme;
    }
    root.setAttribute('data-theme', currentTheme);

    function updateThemeIcon() {
      themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
      themeToggle.innerHTML = currentTheme === 'dark'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
    function saveTheme() {
      safeLocalStorageSet(STORAGE_THEME_KEY, currentTheme);
    }
    updateThemeIcon();
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      saveTheme();
      updateThemeIcon();
    });

    const agendaDate = document.getElementById('agendaDate');
    const selectedDateText = document.getElementById('selectedDateText');
    const totalCount = document.getElementById('totalCount');
    const nextAppointment = document.getElementById('nextAppointment');
    const feedback = document.getElementById('feedback');
    const jumpTodayBtn = document.getElementById('jumpTodayBtn');

    const scheduleModal = document.getElementById('scheduleModal');
    const scheduleForm = document.getElementById('scheduleForm');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const firstField = document.getElementById('tutorName');
    const appointmentDateInput = document.getElementById('appointmentDate');
    const appointmentTimeInput = document.getElementById('appointmentTime');
    const phoneInput = document.getElementById('phone');

    const lists = {
      manha: document.getElementById('manhaList'),
      tarde: document.getElementById('tardeList'),
      noite: document.getElementById('noiteList')
    };

    const initialAppointments = [
      { id: crypto.randomUUID(), date: getToday(), time: '08:00', pet: 'Mel', tutor: 'Carla Nunes', phone: '(91) 98888-1001', service: 'Banho completo e hidratação.' },
      { id: crypto.randomUUID(), date: getToday(), time: '10:30', pet: 'Thor', tutor: 'Paulo Lima', phone: '(91) 98888-2002', service: 'Consulta de rotina e limpeza de ouvidos.' },
      { id: crypto.randomUUID(), date: getToday(), time: '14:00', pet: 'Nina', tutor: 'Fernanda Souza', phone: '(91) 98888-3003', service: 'Tosa higiênica e corte de unhas.' },
      { id: crypto.randomUUID(), date: getToday(), time: '19:00', pet: 'Bidu', tutor: 'Rafael Costa', phone: '(91) 98888-4004', service: 'Banho antialérgico.' },
      { id: crypto.randomUUID(), date: addDays(getToday(), 1), time: '16:30', pet: 'Luna', tutor: 'Patrícia Alves', phone: '(91) 98888-5005', service: 'Escovação e perfume.' }
    ];

    let appointments = loadAppointments();

    function loadAppointments() {
      const stored = safeLocalStorageGet(STORAGE_APPOINTMENTS_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        } catch (error) {
          console.warn('Falha ao carregar agendamentos do armazenamento local.', error);
        }
      }
      return [...initialAppointments];
    }

    function saveAppointments() {
      safeLocalStorageSet(STORAGE_APPOINTMENTS_KEY, JSON.stringify(appointments));
    }

    function getToday() {
      const today = new Date();
      const offset = today.getTimezoneOffset() * 60000;
      return new Date(today.getTime() - offset).toISOString().split('T')[0];
    }

    function addDays(dateString, days) {
      const date = new Date(dateString + 'T00:00:00');
      date.setDate(date.getDate() + days);
      const offset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() - offset).toISOString().split('T')[0];
    }

    function formatDisplayDate(dateString) {
      if (!dateString) return '--/--/----';
      return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date(dateString + 'T00:00:00'));
    }

    function getPeriod(time) {
      if (time >= '06:00' && time <= '11:59') return 'manha';
      if (time >= '12:00' && time <= '17:59') return 'tarde';
      if (time >= '18:00' && time <= '22:00') return 'noite';
      return null;
    }

    function getNextAllowedHour() {
      const now = new Date();
      const nextHour = now.getHours() + 1;
      return Math.max(nextHour, 6);
    }

    function formatHour(hour) {
      return String(hour).padStart(2, '0') + ':00';
    }

    function updateTimeConstraints(dateValue) {
      const today = getToday();
      const isToday = dateValue === today;
      appointmentTimeInput.min = isToday ? formatHour(getNextAllowedHour()) : '06:00';
      appointmentTimeInput.max = '22:00';

      if (isToday && getNextAllowedHour() > 22) {
        appointmentTimeInput.disabled = true;
        appointmentTimeInput.value = '';
        appointmentTimeInput.placeholder = 'Nenhum horário disponível hoje';
      } else {
        appointmentTimeInput.disabled = false;
        appointmentTimeInput.placeholder = '';
      }
    }

    function showFeedback(message, type = 'success') {
      feedback.textContent = message;
      feedback.className = `feedback show ${type}`;
      clearTimeout(showFeedback.timer);
      showFeedback.timer = setTimeout(() => {
        feedback.className = 'feedback';
      }, 3200);
    }

    function sortAppointmentsByTime(items) {
      return [...items].sort((a, b) => a.time.localeCompare(b.time));
    }

    function renderAgenda() {
      const selectedDate = agendaDate.value;
      selectedDateText.textContent = formatDisplayDate(selectedDate);

      Object.values(lists).forEach(list => list.innerHTML = '');

      const dayAppointments = sortAppointmentsByTime(appointments.filter(item => item.date === selectedDate));
      totalCount.textContent = String(dayAppointments.length);
      nextAppointment.textContent = dayAppointments[0] ? `${dayAppointments[0].time} · ${dayAppointments[0].pet}` : 'Sem horário';

      const grouped = { manha: [], tarde: [], noite: [] };
      dayAppointments.forEach(item => {
        const period = getPeriod(item.time);
        if (period) grouped[period].push(item);
      });

      Object.entries(grouped).forEach(([period, items]) => {
        const target = lists[period];
        if (!items.length) {
          const empty = document.createElement('div');
          empty.className = 'empty-state';
          empty.textContent = 'Nenhum agendamento neste período.';
          target.appendChild(empty);
          return;
        }

        items.forEach(item => {
          const card = document.createElement('article');
          card.className = 'appointment';
          card.innerHTML = `
            <div class="appointment-time">${item.time}</div>
            <div class="appointment-main">
              <strong>${escapeHTML(item.pet)}</strong>
              <div class="appointment-meta">
                <span><strong>Tutor:</strong> ${escapeHTML(item.tutor)}</span>
                <span><strong>Telefone:</strong> ${escapeHTML(item.phone)}</span>
              </div>
              <p class="appointment-service">${escapeHTML(item.service)}</p>
            </div>
            <button class="delete-btn" type="button" aria-label="Remover agendamento de ${escapeHTML(item.pet)}" data-id="${item.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path></svg>
            </button>
          `;
          target.appendChild(card);
        });
      });
    }

    function escapeHTML(value) {
      return value.replace(/[&<>'"]/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char]));
    }

    function openModal() {
      appointmentDateInput.min = getToday();
      appointmentDateInput.value = agendaDate.value;
      updateTimeConstraints(appointmentDateInput.value);
      scheduleModal.showModal();
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstField.focus(), 30);
    }

    function closeModal() {
      scheduleModal.close();
      document.body.style.overflow = '';
      scheduleForm.reset();
      appointmentDateInput.value = agendaDate.value;
      clearErrors();
    }

    function clearErrors() {
      document.querySelectorAll('.field').forEach(field => field.classList.remove('invalid'));
      document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    }

    function clearFieldError(name) {
      const field = scheduleForm.querySelector(`[name="${name}"]`)?.closest('.field');
      const error = scheduleForm.querySelector(`[data-error-for="${name}"]`);
      if (field) field.classList.remove('invalid');
      if (error) error.textContent = '';
    }

    function setFieldError(name, message) {
      const field = scheduleForm.querySelector(`[name="${name}"]`).closest('.field');
      const error = scheduleForm.querySelector(`[data-error-for="${name}"]`);
      field.classList.add('invalid');
      error.textContent = message;
    }

    function normalizePhone(value) {
      return value.replace(/\D/g, '');
    }

    function validateForm(data) {
      clearErrors();
      const errors = {};
      const requiredFields = {
        tutorName: 'Informe o nome do tutor.',
        petName: 'Informe o nome do pet.',
        phone: 'Informe um telefone para contato.',
        serviceDescription: 'Descreva o serviço solicitado.',
        appointmentDate: 'Selecione a data do atendimento.',
        appointmentTime: 'Selecione a hora do atendimento.'
      };

      Object.entries(requiredFields).forEach(([key, message]) => {
        if (!data[key].trim()) errors[key] = message;
      });

      const phoneDigits = normalizePhone(data.phone);
      if (data.phone.trim() && phoneDigits.length < 10) {
        errors.phone = 'Digite um telefone válido com DDD.';
      }

      if (data.appointmentDate && data.appointmentDate < getToday()) {
        errors.appointmentDate = 'Data inválida. Escolha hoje ou uma data futura.';
      }

      const validPeriod = getPeriod(data.appointmentTime);
      if (data.appointmentTime && !validPeriod) {
        errors.appointmentTime = 'Use um horário entre 06:00 e 22:00.';
      }

      if (data.appointmentDate === getToday()) {
        const nextHour = getNextAllowedHour();
        if (nextHour > 22) {
          errors.appointmentDate = 'Não há horários disponíveis para hoje. Selecione outra data.';
        } else if (data.appointmentTime && data.appointmentTime < formatHour(nextHour)) {
          errors.appointmentTime = `Escolha um horário a partir de ${formatHour(nextHour)}.`;
        }
      }

      const conflict = appointments.some(item => item.date === data.appointmentDate && item.time === data.appointmentTime);
      if (!errors.appointmentTime && conflict) {
        errors.appointmentTime = 'Já existe um agendamento nesse horário para esta data.';
      }

      Object.entries(errors).forEach(([key, message]) => setFieldError(key, message));
      return { valid: Object.keys(errors).length === 0, period: validPeriod };
    }

    function formatPhoneInput(value) {
      const digits = value.replace(/\D/g, '').slice(0, 11);
      if (digits.length <= 10) {
        return digits
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2');
      }
      return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }

    phoneInput.addEventListener('input', event => {
      event.target.value = formatPhoneInput(event.target.value);
    });

    scheduleForm.querySelectorAll('input, textarea').forEach(control => {
      control.addEventListener('input', () => {
        if (control.name) clearFieldError(control.name);
      });
    });

    scheduleForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(scheduleForm).entries());
      const validation = validateForm(data);
      if (!validation.valid) return;

      appointments.push({
        id: crypto.randomUUID(),
        tutor: data.tutorName.trim(),
        pet: data.petName.trim(),
        phone: data.phone.trim(),
        service: data.serviceDescription.trim(),
        date: data.appointmentDate,
        time: data.appointmentTime
      });
      saveAppointments();

      agendaDate.value = data.appointmentDate;
      renderAgenda();
      showFeedback('Agendamento criado com sucesso.', 'success');
      closeModal();
    });

    document.querySelector('.agenda').addEventListener('click', event => {
      const button = event.target.closest('.delete-btn');
      if (!button) return;
      const { id } = button.dataset;
      appointments = appointments.filter(item => item.id !== id);
      saveAppointments();
      renderAgenda();
      showFeedback('Agendamento removido imediatamente.', 'success');
    });

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);
    scheduleModal.addEventListener('cancel', event => {
      event.preventDefault();
      closeModal();
    });
    scheduleModal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });

    agendaDate.addEventListener('change', () => {
      renderAgenda();
      showFeedback('Agenda atualizada para a nova data.', 'success');
    });

    jumpTodayBtn.addEventListener('click', () => {
      agendaDate.value = getToday();
      renderAgenda();
      showFeedback('Exibindo os agendamentos de hoje.', 'success');
    });

    appointmentDateInput.addEventListener('change', () => {
      clearFieldError('appointmentDate');
      updateTimeConstraints(appointmentDateInput.value);
      if (appointmentDateInput.value === getToday() && getNextAllowedHour() > 22) {
        showFeedback('Não há horários disponíveis para hoje. Escolha outra data.', 'error');
      }
    });

    appointmentTimeInput.addEventListener('input', () => {
      clearFieldError('appointmentTime');
    });

    appointmentTimeInput.addEventListener('change', () => {
      if (appointmentTimeInput.value && !getPeriod(appointmentTimeInput.value)) {
        setFieldError('appointmentTime', 'Escolha um horário entre 06:00 e 22:00.');
      }
    });

    agendaDate.value = getToday();
    appointmentDateInput.value = getToday();
    appointmentDateInput.min = getToday();
    updateTimeConstraints(appointmentDateInput.value);
    renderAgenda();