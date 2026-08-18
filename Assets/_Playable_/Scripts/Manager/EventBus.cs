using System;
using System.Collections.Generic;

namespace Playable
{
    public static class EventBus
    {
        private static readonly Dictionary<Type, Delegate> Listeners =
            new Dictionary<Type, Delegate>();

        public static void Subscribe<T>(Action<T> listener) where T : BaseEvent
        {
            Type eventType = typeof(T);
            if (Listeners.TryGetValue(eventType, out Delegate currentListeners))
            {
                Listeners[eventType] = Delegate.Combine(currentListeners, listener);
                return;
            }

            Listeners[eventType] = listener;
        }

        public static void Unsubscribe<T>(Action<T> listener) where T : BaseEvent
        {
            Type eventType = typeof(T);
            if (!Listeners.TryGetValue(eventType, out Delegate currentListeners))
            {
                return;
            }

            Delegate remainingListeners = Delegate.Remove(currentListeners, listener);
            if (remainingListeners == null)
            {
                Listeners.Remove(eventType);
                return;
            }

            Listeners[eventType] = remainingListeners;
        }

        public static void Publish<T>(T eventData) where T : BaseEvent
        {
            if (Listeners.TryGetValue(typeof(T), out Delegate listeners))
            {
                (listeners as Action<T>)?.Invoke(eventData);
            }
        }
    }
}
