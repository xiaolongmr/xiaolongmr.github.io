/**
 * Firebase 认证系统
 * 负责用户登录、注册、状态管理等核心功能
 */

// 引入Firebase相关SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/**
 * Firebase 配置信息
 * 请根据您的Firebase项目配置进行修改
 */
const firebaseConfig = {
    apiKey: "AIzaSyDiz-O33R3gAm4SfWyh8lSKMX-_4HdPrvg",
    authDomain: "excel-6ffce.firebaseapp.com",
    projectId: "excel-6ffce",
    storageBucket: "excel-6ffce.firebasestorage.app",
    messagingSenderId: "380737839136",
    appId: "1:380737839136:web:1f1ab3e046b761106c5c45",
    measurementId: "G-WXCMT6NDXZ"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * 全局变量
 */
let currentUser = null;
let userProfile = null;

/**
 * 用户认证状态管理类
 */
class AuthManager {
    constructor() {
        this.init();
    }

    /**
     * 初始化认证管理器
     */
    init() {
        // 监听认证状态变化
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await this.handleUserLogin(user);
            } else {
                this.handleUserLogout();
            }
        });

        // 绑定事件监听器
        this.bindEvents();
    }

    /**
     * 处理用户登录
     * @param {Object} user - Firebase用户对象
     */
    async handleUserLogin(user) {
        currentUser = user;
        console.log('用户已登录:', user.email);

        // 获取用户详细信息
        await this.loadUserProfile(user.uid);

        // 更新UI状态
        this.updateUIForLoggedInUser();

        // 显示用户头像
        this.showUserAvatar();

        // 隐藏登录按钮
        this.hideLoginButton();

        // 显示我的导航模块
        this.showFavoritesBox();
    }

    /**
     * 处理用户登出
     */
    handleUserLogout() {
        currentUser = null;
        userProfile = null;
        console.log('用户已登出');

        // 更新UI状态
        this.updateUIForLoggedOutUser();

        // 隐藏用户头像
        this.hideUserAvatar();

        // 显示登录按钮
        this.showLoginButton();

        // 隐藏我的导航模块
        this.hideFavoritesBox();
    }

    /**
     * 加载用户详细信息
     * @param {string} uid - 用户ID
     */
    async loadUserProfile(uid) {
        try {
            const userDoc = doc(db, 'userProfiles', uid);
            const snap = await getDoc(userDoc);

            if (snap.exists()) {
                userProfile = snap.data();
            } else {
                // 创建默认用户资料
                userProfile = {
                    nickname: currentUser.displayName || currentUser.email.split('@')[0],
                    avatar: this.getDefaultAvatar(currentUser.email),
                    bio: '',
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };
                await this.saveUserProfile(uid, userProfile);
            }
        } catch (error) {
            console.error('加载用户资料失败:', error);
            userProfile = {
                nickname: currentUser.displayName || currentUser.email.split('@')[0],
                avatar: this.getDefaultAvatar(currentUser.email),
                bio: '',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
        }
    }

    /**
     * 保存用户资料
     * @param {string} uid - 用户ID
     * @param {Object} profile - 用户资料对象
     */
    async saveUserProfile(uid, profile) {
        try {
            const userDoc = doc(db, 'userProfiles', uid);
            await setDoc(userDoc, profile, { merge: true });
        } catch (error) {
            console.error('保存用户资料失败:', error);
        }
    }

    /**
     * 获取默认头像
     * @param {string} email - 用户邮箱
     * @returns {string} 头像URL
     */
    getDefaultAvatar(email) {
        // 如果是QQ邮箱，尝试获取QQ头像
        if (email.includes('@qq.com')) {
            const qqNumber = email.split('@')[0];
            if (/^\d+$/.test(qqNumber)) {
                return `https://q1.qlogo.cn/g?b=qq&nk=${qqNumber}&s=100`;
            }
        }

        // 默认头像
        return 'https://cdn.jsdmirror.com/gh/xiaolongmr/test@main/1.png';
    }

    /**
     * 更新登录用户UI
     */
    updateUIForLoggedInUser() {
        // 关闭登录弹窗
        this.closeLoginModal();

        // 更新用户头像显示
        this.updateUserAvatar();
    }

    /**
     * 更新登出用户UI
     */
    updateUIForLoggedOutUser() {
        // 清空表单
        this.clearLoginForm();

        // 隐藏下拉菜单
        this.hideUserDropdown();
    }

    /**
     * 显示用户头像
     */
    showUserAvatar() {
        const avatarBtn = document.getElementById('user-avatar-btn');
        if (avatarBtn) {
            avatarBtn.style.display = 'block';
        }
    }

    /**
     * 隐藏用户头像
     */
    hideUserAvatar() {
        const avatarBtn = document.getElementById('user-avatar-btn');
        if (avatarBtn) {
            avatarBtn.style.display = 'none';
        }
    }

    /**
     * 更新用户头像显示
     */
    updateUserAvatar() {
        const avatarContainer = document.getElementById('user-avatar-container');
        if (avatarContainer && userProfile) {
            const avatarImg = avatarContainer.querySelector('.user-avatar');
            const userName = avatarContainer.querySelector('.user-name');

            if (avatarImg) {
                avatarImg.src = userProfile.avatar;
                avatarImg.alt = userProfile.nickname;
            }

            if (userName) {
                userName.textContent = userProfile.nickname;
            }
        }
    }

    /**
     * 显示登录按钮
     */
    showLoginButton() {
        const loginBtn = document.getElementById('top-login-btn');
        if (loginBtn) {
            loginBtn.style.display = 'block';
        }
    }

    /**
     * 隐藏登录按钮
     */
    hideLoginButton() {
        const loginBtn = document.getElementById('top-login-btn');
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
    }

    /**
     * 显示我的导航模块
     */
    showFavoritesBox() {
        const favBox = document.getElementById('my-fav-box');
        if (favBox) {
            favBox.style.display = 'block';
        }
    }

    /**
     * 隐藏我的导航模块
     */
    hideFavoritesBox() {
        const favBox = document.getElementById('my-fav-box');
        if (favBox) {
            favBox.style.display = 'none';
        }
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 登录按钮点击事件
        const loginBtn = document.getElementById('top-login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showLoginModal());
        }

        // 用户头像点击事件
        const avatarBtn = document.getElementById('user-avatar-btn');
        if (avatarBtn) {
            avatarBtn.addEventListener('click', () => this.toggleUserDropdown());
        }

        // 点击外部关闭下拉菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#user-avatar-btn')) {
                this.hideUserDropdown();
            }
        });

        // 登录表单提交事件
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // 注册表单提交事件
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }

    /**
     * 显示登录弹窗
     */
    showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'flex';
            // 切换到登录模式
            this.switchToLoginMode();
        }
    }

    /**
     * 关闭登录弹窗
     */
    closeLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'none';
            this.clearLoginForm();
        }
    }

    /**
     * 切换到登录模式
     */
    switchToLoginMode() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const switchBtn = document.getElementById('switch-mode-btn');

        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        if (switchBtn) switchBtn.textContent = '没有账号？立即注册';
    }

    /**
     * 切换到注册模式
     */
    switchToRegisterMode() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const switchBtn = document.getElementById('switch-mode-btn');

        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        if (switchBtn) switchBtn.textContent = '已有账号？立即登录';
    }

    /**
     * 清空登录表单
     */
    clearLoginForm() {
        const inputs = document.querySelectorAll('#login-modal input');
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('error');
        });

        // 清除错误信息
        const errors = document.querySelectorAll('.form-error');
        errors.forEach(error => {
            error.style.display = 'none';
        });
    }

    /**
     * 处理登录
     */
    async handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const loginBtn = document.getElementById('login-btn');

        // 验证输入
        if (!this.validateEmail(email)) {
            this.showError('login-email', '请输入有效的邮箱地址');
            return;
        }

        if (!password) {
            this.showError('login-password', '请输入密码');
            return;
        }

        // 显示加载状态
        this.setLoadingState(loginBtn, true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('登录成功');
        } catch (error) {
            console.error('登录失败:', error);
            this.handleAuthError(error);
        } finally {
            this.setLoadingState(loginBtn, false);
        }
    }

    /**
     * 处理注册
     */
    async handleRegister() {
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const nickname = document.getElementById('register-nickname').value.trim();
        const registerBtn = document.getElementById('register-btn');

        // 验证输入
        if (!this.validateEmail(email)) {
            this.showError('register-email', '请输入有效的邮箱地址');
            return;
        }

        if (password.length < 6) {
            this.showError('register-password', '密码至少需要6位');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('register-confirm-password', '两次输入的密码不一致');
            return;
        }

        if (!nickname) {
            this.showError('register-nickname', '请输入昵称');
            return;
        }

        // 显示加载状态
        this.setLoadingState(registerBtn, true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // 更新用户资料
            await updateProfile(userCredential.user, {
                displayName: nickname
            });

            // 创建用户资料文档
            const userProfile = {
                nickname: nickname,
                avatar: this.getDefaultAvatar(email),
                bio: '',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            await this.saveUserProfile(userCredential.user.uid, userProfile);

            console.log('注册成功');
        } catch (error) {
            console.error('注册失败:', error);
            this.handleAuthError(error);
        } finally {
            this.setLoadingState(registerBtn, false);
        }
    }

    /**
     * 处理登出
     */
    async handleLogout() {
        try {
            await signOut(auth);
            console.log('登出成功');
        } catch (error) {
            console.error('登出失败:', error);
            alert('登出失败：' + error.message);
        }
    }

    /**
     * 切换用户下拉菜单
     */
    toggleUserDropdown() {
        const dropdown = document.querySelector('.user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    /**
     * 隐藏用户下拉菜单
     */
    hideUserDropdown() {
        const dropdown = document.querySelector('.user-dropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }

    /**
     * 验证邮箱格式
     * @param {string} email - 邮箱地址
     * @returns {boolean} 是否有效
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 显示错误信息
     * @param {string} fieldId - 字段ID
     * @param {string} message - 错误信息
     */
    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = field.parentNode.querySelector('.form-error');

        if (field) {
            field.classList.add('error');
        }

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    /**
     * 设置加载状态
     * @param {HTMLElement} button - 按钮元素
     * @param {boolean} loading - 是否加载中
     */
    setLoadingState(button, loading) {
        if (loading) {
            button.disabled = true;
            button.classList.add('loading');
            button.textContent = '处理中...';
        } else {
            button.disabled = false;
            button.classList.remove('loading');
            button.textContent = button.dataset.originalText || '登录';
        }
    }

    /**
     * 处理认证错误
     * @param {Object} error - 错误对象
     */
    handleAuthError(error) {
        let message = '操作失败';

        switch (error.code) {
            case 'auth/user-not-found':
                message = '用户不存在';
                break;
            case 'auth/wrong-password':
                message = '密码错误';
                break;
            case 'auth/email-already-in-use':
                message = '邮箱已被注册';
                break;
            case 'auth/weak-password':
                message = '密码强度太弱';
                break;
            case 'auth/invalid-email':
                message = '邮箱格式无效';
                break;
            case 'auth/too-many-requests':
                message = '请求过于频繁，请稍后再试';
                break;
            default:
                message = error.message;
        }

        alert(message);
    }

    /**
     * 获取当前用户
     * @returns {Object|null} 当前用户对象
     */
    getCurrentUser() {
        return currentUser;
    }

    /**
     * 获取用户资料
     * @returns {Object|null} 用户资料对象
     */
    getUserProfile() {
        return userProfile;
    }

    /**
     * 检查是否已登录
     * @returns {boolean} 是否已登录
     */
    isLoggedIn() {
        return currentUser !== null;
    }
}

/**
 * 全局认证管理器实例
 */
window.authManager = new AuthManager();

/**
 * 全局函数 - 显示登录弹窗
 */
window.showLoginModal = function () {
    window.authManager.showLoginModal();
};

/**
 * 全局函数 - 关闭登录弹窗
 */
window.closeLoginModal = function () {
    window.authManager.closeLoginModal();
};

/**
 * 全局函数 - 切换登录/注册模式
 */
window.switchAuthMode = function () {
    const loginForm = document.getElementById('login-form');
    if (loginForm && loginForm.style.display !== 'none') {
        window.authManager.switchToRegisterMode();
    } else {
        window.authManager.switchToLoginMode();
    }
};

/**
 * 全局函数 - 登出
 */
window.logout = function () {
    window.authManager.handleLogout();
};

/**
 * 全局函数 - 重置密码
 */
window.resetPassword = function () {
    const email = document.getElementById('login-email').value.trim();
    if (!email) {
        alert('请先输入邮箱地址');
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('密码重置邮件已发送，请检查您的邮箱');
        })
        .catch((error) => {
            console.error('发送重置邮件失败:', error);
            alert('发送重置邮件失败：' + error.message);
        });
};

// 导出认证管理器供其他模块使用
export { AuthManager, auth, db }; 