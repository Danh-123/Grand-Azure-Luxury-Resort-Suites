/**
 * Telegram Notification Service for Grand Azure Luxury Resort & Suites
 * Sends instant, elegantly-formatted booking notifications to Telegram Bot/Channel.
 * Cost: 0đ (Free Telegram Bot API)
 */

export interface BookingNotificationPayload {
  bookingCode: string;
  roomName: string;
  roomType?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  totalPrice: number;
  currency?: string;
  createdAt?: string;
}

/**
 * Escapes HTML entities to ensure Telegram HTML parse_mode does not error out on special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Sends a luxury formatted booking alert to Telegram
 */
export async function sendTelegramBookingNotification(
  payload: BookingNotificationPayload
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      '[Telegram Notification] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in environment. Notification skipped.'
    );
    return {
      success: false,
      error: 'Telegram credentials missing in environment variables.',
    };
  }

  const {
    bookingCode,
    roomName,
    roomType,
    checkIn,
    checkOut,
    nights,
    guests,
    guestInfo,
    totalPrice,
    currency = 'USD',
    createdAt = new Date().toISOString(),
  } = payload;

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const formattedDate = new Date(createdAt).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
  });

  const specialReqText = guestInfo.specialRequests?.trim()
    ? `\n• <i>Yêu cầu đặc biệt:</i> <code>${escapeHtml(guestInfo.specialRequests.trim())}</code>`
    : '';

  const message = [
    `🏰 <b>[GRAND AZURE RESORT] ĐƠN ĐẶT PHÒNG MỚI</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 <b>Mã đặt phòng:</b> <code>#${escapeHtml(bookingCode)}</code>`,
    `🛎 <b>Hạng phòng:</b> <b>${escapeHtml(roomName)}</b> ${roomType ? `(<i>${escapeHtml(roomType)}</i>)` : ''}`,
    `📅 <b>Thời gian lưu trú:</b> <b>${escapeHtml(checkIn)}</b> ➔ <b>${escapeHtml(checkOut)}</b> (<b>${nights} đêm</b>)`,
    `👥 <b>Số lượng khách:</b> <b>${guests.adults}</b> người lớn${guests.children > 0 ? `, <b>${guests.children}</b> trẻ em` : ''}`,
    ``,
    `👤 <b>Thông tin khách hàng:</b>`,
    `• <b>Họ tên:</b> ${escapeHtml(guestInfo.fullName)}`,
    `• <b>Email:</b> <code>${escapeHtml(guestInfo.email)}</code>`,
    `• <b>Số điện thoại:</b> <code>${escapeHtml(guestInfo.phone)}</code>${specialReqText}`,
    ``,
    `💳 <b>Tổng thanh toán:</b> <pre>${formattedTotal}</pre> (Đã gồm VAT & phí dịch vụ)`,
    `⏱ <b>Thời gian tạo:</b> <i>${formattedDate}</i>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🔔 <i>Vui lòng đăng nhập hệ thống Quản trị (Admin Dashboard) để duyệt và sắp xếp buồng phòng chu đáo cho khách.</i>`,
  ].join('\n');

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      const errMsg = data.description || `HTTP ${response.status} failed`;
      console.error('[Telegram Notification] Telegram API Error:', errMsg);
      return { success: false, error: errMsg };
    }

    console.info(`[Telegram Notification] Successfully delivered booking #${bookingCode} to chat ${chatId}`);
    return { success: true };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Unknown network error';
    console.error('[Telegram Notification] Exception when sending message:', errMsg);
    return { success: false, error: errMsg };
  }
}

